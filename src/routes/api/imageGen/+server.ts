import { FAL_KEY } from '$env/static/private';
import { getRandomArbitrary } from '$lib/funcs';
import type { ImageType, Result } from '$lib/types';
import * as fal from '@fal-ai/serverless-client';
import { error, json } from '@sveltejs/kit';
import Vibrant from 'node-vibrant';

const textColour = { r: 14, g: 13, b: 13 };
const ratioTarget = 0.22222;
const imageSize = 'square';
const test = false;

const extraPrompt =
	'amateur film photography, grain, disposable, candid, family, polaroid, nostalgic: ';
fal.config({
	credentials: FAL_KEY
});

export async function GET({ url }: { url: URL }) {
	const newUrl = new URL(url);
	const system = newUrl.searchParams.get('system') || extraPrompt;
	const prompt = newUrl.searchParams.get('prompt');
	const model = newUrl.searchParams.get('model') || 'schnell';
	const number = parseInt(newUrl.searchParams.get('number') || '1');
	const image = newUrl.searchParams.get('image') || null;
	if (test && !image) {
		return json([
			{
				url: 'https://fal.media/files/koala/y5TgdzkApAt3a57kdENlN.png',
				width: 512,
				height: 512,
				content_type: 'image/jpeg',
				prompt: 'turtles fuckin',
				colour: '#c96c48',
				chosen: false
			},
			{
				url: 'https://fal.media/files/penguin/vH9NMaT5UT98MY3nG8DT3.png',
				width: 512,
				height: 512,
				content_type: 'image/jpeg',
				prompt: 'turtles fuckin',
				colour: '#d29810',
				chosen: false
			},
			{
				url: 'https://fal.media/files/lion/MVMnQouYwQgJvWG4YRVg-.png',
				width: 512,
				height: 512,
				content_type: 'image/jpeg',
				prompt: 'turtles fuckin',
				colour: '#9fb152',
				chosen: false
			},
			{
				url: 'https://fal.media/files/kangaroo/3mJ4-J3LXDMMXSnFxboHN.png',
				width: 512,
				height: 512,
				content_type: 'image/jpeg',
				prompt: 'turtles fuckin',
				colour: '#c7ae8a',
				chosen: false
			}
		]);
	}
	if (!prompt) {
		return json({ error: 'No prompt dumbo' }, { status: 500 });
	}
	try {
		console.log('Genning');
		let images: ImageType[] | any = await genImg(system, prompt, model, number, image);
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
	model = 'fal-ai/sana/sprint',
	number = 1,
	image: null | string = null
) => {
	try {
		console.log(extra, prompt, model, number, image);
		let input: any = {
			prompt: extra + prompt,
			image_size: imageSize,
			enable_safety_checker: true,
			num_inference_steps: 2,
			num_images: number,
			guidance_scale: 2
		};

		if (model != 'fal-ai/sana/sprint') {
			input.guidance_scale = 1;
			input.num_inference_steps = 28;
		}
		if (image) {
			input.image_url = image;
			model = 'fal-ai/flux/dev/image-to-image';
			input.guidance_scale = getRandomArbitrary(1, 5);
			input.guidance_scale = 1;
			input.num_inference_steps = 28;
		} else {
			input.prompt =
				'amateur film photography, grain, disposable, candid, family, polaroid, nostalgic: ' +
				prompt;
			input.output_format = 'jpeg';
			input.style_name = '(No style)';
		}
		console.log(input, model, image);
		const result: Result = await fal.subscribe(`${model}`, {
			input: input,
			logs: true,
			onQueueUpdate: (update) => {
				// if (update.status === 'IN_PROGRESS') {
				// 	update.logs.map((log) => log.message).forEach(console.log);
				// }
			}
		});

		result.images.map((image) => {
			image.prompt = prompt;
			image.chosen = false;
			return image;
		});

		console.log(result.images.length);
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
