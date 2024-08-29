import { FAL_KEY } from '$env/static/private';
import type { ImageType, Result } from '$lib/types';
import * as fal from '@fal-ai/serverless-client';
import { error, json } from '@sveltejs/kit';
import Vibrant from 'node-vibrant';

const textColour = { r: 14, g: 13, b: 13 };
const ratioTarget = 0.22222;
const imageSize = 'square';

const extraPrompt =
	'ametuer film photography, grain, disposable, candid, family, poliriod, nostalgic:';
fal.config({
	credentials: FAL_KEY
});

export async function GET({ url }: { url: URL }) {
	const newUrl = new URL(url);
	console.log(newUrl.searchParams.get('prompt'));
	const prompt = newUrl.searchParams.get('prompt');
	const model = newUrl.searchParams.get('model') || 'schnell';
	const number = parseInt(newUrl.searchParams.get('number') || '1');
	const image = newUrl.searchParams.get('image') || null;

	if (!prompt) {
		return json({ error: 'No prompt dumbo' }, { status: 500 });
	}
	try {
		let images: ImageType[] | any = await genImg(extraPrompt, prompt, model, number, image);
		if (images[0]) {
			images = await Promise.all(
				images.map(async (image: ImageType) => {
					let pal = await getPallete(image.url);
					// image.palette = pal.pal;
					image.colour = pal.colour;
					return image;
				})
			);
		}

		return json(images);
	} catch (e: any) {
		console.error('Error in GET function:', e);
		return json({ error: e.message || 'Unknown Error' }, { status: 500 });
	}
}

const genImg = async (
	extra: string,
	prompt: string,
	model = 'schnell',
	number = 1,
	image: null | string = null
) => {
	try {
		let input: any = {
			prompt: extra + prompt,
			image_size: imageSize,
			enable_safety_checker: true,
			num_inference_steps: 28,
			num_images: number
		};

		if (image) {
			input.image_url = image;
		}

		if (model != 'schnell') {
			input.guidance_scale = 1;
		}

		const result: Result = await fal.subscribe(`fal-ai/flux/${model}`, {
			input: input,
			logs: true,
			onQueueUpdate: (update) => {
				if (update.status === 'IN_PROGRESS') {
					update.logs.map((log) => log.message).forEach(console.log);
				}
			}
		});

		result.images.map((image) => {
			image.prompt = prompt;
			return image;
		});

		return result.images as ImageType[];
	} catch (e) {
		console.error('Error in genImg function:', e);
		throw new Error('Failed to generate images.');
	}
};

const getPallete = async (src: string) => {
	try {
		let pal = await Vibrant.from(src).getPalette();
		let newPal: any = {};
		let bestHex = '';
		let bestRatio = 100;
		let foundBest = false;
		for (const [key, value] of Object.entries(pal)) {
			if (value) {
				let hex = rgbToHex(value.rgb[0], value.rgb[1], value.rgb[2]);
				let ratio = getBestHex({ r: value.rgb[0], g: value.rgb[1], b: value.rgb[2] });
				if (ratio < bestRatio && !foundBest) {
					bestRatio = ratio;
					bestHex = hex;
					if (key == 'Vibrant' && ratio < ratioTarget) {
						foundBest = true;
					}
				}
				newPal[key] = { ...value, hex: hex };
			}
		}

		// console.log(newPal);
		return { pal: newPal, colour: bestHex };
	} catch (e) {
		console.error('Error in getPalette function:', e);
		throw new Error('Failed to get palette.');
	}
};

function componentToHex(c: number) {
	var hex = c.toString(16);
	return hex.length == 1 ? '0' + hex : hex;
}

function rgbToHex(r: number, g: number, b: number) {
	return '#' + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

const getBestHex = (currentRGB: { r: number; g: number; b: number }) => {
	function luminance(r: number, g: number, b: number) {
		var a = [r, g, b].map(function (v) {
			v /= 255;
			return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
		});
		return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
	}

	const color1luminance = luminance(currentRGB.r, currentRGB.g, currentRGB.b);
	const color2luminance = luminance(textColour.r, textColour.g, textColour.b);

	const ratio =
		color1luminance > color2luminance
			? (color2luminance + 0.05) / (color1luminance + 0.05)
			: (color1luminance + 0.05) / (color2luminance + 0.05);

	return ratio;
};
