import { POCKET_PASS, POCKET_URL, POCKET_USER } from '$env/static/private';
import { gameData } from '$lib/store';
import type { userData } from '$lib/types';
import { json } from '@sveltejs/kit';
import PocketBase from 'pocketbase';

const pb = new PocketBase(POCKET_URL);
const authData = await pb.admins.authWithPassword(POCKET_USER, POCKET_PASS);

type ImageData = {
	colour: string;
	image: string;
	chosen: string;
	prompt: string;
};

export async function POST({ url, request }: { url: URL; request: Request }) {
	console.log('UPLOADING');
	let data = await request.json();
	let gamedata = data.gameData as userData;
	console.log(await gamedata);
	try {
		return await uploader(await gamedata);
	} catch (e: any) {
		return json({ error: e.message || 'Upload Error' }, { status: 500 });
	}
}

const uploader = async (data: userData) => {
	let finalImgId = '';
	let stageIds = [];
	console.log(data, 'stratng');
	for (const stage of data.stages) {
		console.log(stage, 'stage Start');

		let imageIds = [];
		for (const image of stage.images) {
			console.log(image, 'image Start');

			try {
				const formData = new FormData();
				const imageData = image.url;
				const response = await fetch(imageData);
				const blob = await response.blob();
				formData.append('colour', image.colour || '');
				formData.append('image', blob);
				formData.append('prompt', image.prompt);
				formData.append('chosen', image.chosen ? 'True' : 'False');
				const imageUpload = await pb.collection('Images').create(formData);
				console.log(await imageUpload);
				imageIds.push(await imageUpload.id);
				if (data.finalImg) {
					if (image.url === data.finalImg.url) {
						finalImgId = await imageUpload.id;
					}
				}
			} catch (e: any) {
				return json({ error: e.message || 'Image Upload Error' }, { status: 500 });
			}
		}

		try {
			const uploadData = {
				fact: stage.fact,
				incitement: stage.incitement,
				prompt: stage.prompt,
				images: imageIds
			};

			const stageUpload = await pb.collection('stages').create(uploadData);
			console.log(await stageUpload);
			stageIds.push(await stageUpload.id);
		} catch (e: any) {
			return json({ error: e.message || 'Stage Upload Error' }, { status: 500 });
		}
	}

	try {
		const uploadData = {
			stages: stageIds,
			finalImage: finalImgId,
			reason: data.note
		};

		const userUpload = await pb.collection('userData').create(uploadData);
		console.log(await userUpload);
	} catch (e: any) {
		return json({ error: e.message || 'User Upload Error' }, { status: 500 });
	}
};

// const uploadTestItems = async () => {
// 	const images = await pb.collection('Images').getFullList({
// 		sort: '-created'
// 	});

// 	// images.forEach(async (image) => {

// 	// });

// 	let allImages = await images;

// 	for await (let image of images) {
// 		console.log(image.id);
// 		let stage = {
// 			fact: null,
// 			incitement: 'test',
// 			prompt: image.prompt,
// 			images: [image.id]
// 		};

// 		const stageResponse = await pb.collection('stages').create(stage);
// 		console.log(await stageResponse);

// 		let userData = {
// 			stages: await stageResponse.id,
// 			finalPrompt: image.prompt,
// 			finalImage: image.id,
// 			reason: 'test'
// 		};

// 		const userResponse = await pb.collection('userData').create(userData);
// 		console.log(await userResponse);
// 	}

// 	// console.log(await images);
// };
