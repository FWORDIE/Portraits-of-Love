import { json } from '@sveltejs/kit';
import PocketBase, { type RecordModel } from 'pocketbase';
import { POCKET_PASS, POCKET_URL, POCKET_USER } from '$env/static/private';

const pb = new PocketBase(POCKET_URL);
const authData = await pb.admins.authWithPassword(POCKET_USER, POCKET_PASS);

export async function GET({ url }: { url: URL }) {
	const newUrl = new URL(url);
	const numOfImages = parseInt(newUrl.searchParams.get('images') || '24');
	try {
		const records: RecordModel[] = await pb.collection('userData').getFullList({
			sort: '-created',
			expand: 'stages, finalImage'
		});

        console.log( await records.length)
		let returnRecords: any[] = [];
		if (records[0]) {
			returnRecords = getMultipleRandom(records, numOfImages);

			returnRecords = returnRecords.map((data) => {
				let imageUrl = undefined;

				if (data.expand && data.expand.finalImage) {
					imageUrl = pb.files.getUrl(data.expand.finalImage, data.expand.finalImage.image);
				}

				let returnImage = {
					date: data.created,
					image: imageUrl,
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
	const shuffled = [...arr].sort(() => 0.5 - Math.random());
	return shuffled.slice(0, num);
}
