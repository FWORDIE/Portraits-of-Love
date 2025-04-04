import { json } from '@sveltejs/kit';
import PocketBase, { type RecordModel } from 'pocketbase';
import { POCKET_PASS, POCKET_URL, POCKET_USER } from '$env/static/private';

const pb = new PocketBase(POCKET_URL);
console.log('HRLP')

const authData = await pb.admins.authWithPassword(POCKET_USER, POCKET_PASS);
export async function GET({ url }: { url: URL }) {
	const newUrl = new URL(url);
	const numOfImages = parseInt(newUrl.searchParams.get('images') || '0');
	try {
		const records: RecordModel[] = await pb.collection('userData').getFullList({
			sort: '-created',
			expand: 'stages, finalImage'
		});

		console.log(await records.length);
		let returnRecords: any[] = [];
		if (records[0]) {
			returnRecords = getMultipleRandom(records, numOfImages);

			returnRecords = returnRecords.map((data) => {
				let imageUrl = undefined;
				let obj = undefined;

				if (data.expand && data.expand.finalImage) {
					imageUrl = pb.files.getUrl(data.expand.finalImage, data.expand.finalImage.image);
					obj = {
						src: imageUrl,
						width: data.expand.finalImage.width,
						height: data.expand.finalImage.width,
						alt: data.expand.finalImage.prompt,
						base64: data.expand.finalImage.hash,
						bgColor: data.expand.finalImage.colour
					};
				}
				let returnImage = {
					date: data.created,
					image: imageUrl,
					data: obj,
					prompt: data.expand.stages.map((stage: any) => {
						return stage.prompt;
					})
				};
				return returnImage;
			});
		}
		return json(returnRecords);
	} catch (e: any) {
		console.error('Error in GET function:', e);
		return json({ error: e.message || 'Unknown Error' }, { status: 500 });
	}
}

function getMultipleRandom(arr: RecordModel[], num: number) {
	if (num == 0) {
		let rem = arr.length % 3;
		num = arr.length - rem;
		console.log(num);
	}
	const shuffled = [...arr].sort(() => 0.5 - Math.random());
	return shuffled.slice(0, num);
}
