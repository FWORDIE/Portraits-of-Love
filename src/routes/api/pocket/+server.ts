import { POCKET_PASS, POCKET_URL, POCKET_USER } from '$env/static/private';
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
	let data = (await request.json()) as ImageData;
	const newUrl = new URL(url);
	const colour = newUrl.searchParams.get('colour') || '';
	const prompt = newUrl.searchParams.get('prompt') || 'null';
	const chosen = newUrl.searchParams.get('chosen') || 'false';
	return await uploader(data);
}

// export async function GET() {
// 	uploadTestItems();
// }

const uploader = async (data: ImageData) => {
	if (data.image) {
		console.log('UPLOADING Inside');
		try {
			const formData = new FormData();
			const image = data.image;

			const response = await fetch(image);

			const blob = await response.blob();

			formData.append('colour', data.colour);
			formData.append('image', blob);
			formData.append('prompt', data.prompt);
			formData.append('chosen', data.chosen);

			const result = await pb.collection('Images').create(formData);
			console.log(await result, await authData);
			return json({ msg: 'uploaded' });
		} catch (e: any) {
			return json({ error: e.message || 'Upload Error' }, { status: 500 });
		}
	} else {
		return json({ error: 'No image attached' }, { status: 500 });
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
