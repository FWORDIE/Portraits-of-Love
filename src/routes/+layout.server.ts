import type { GalleryImage } from '$lib/types.js';

/** @type {import('@sveltejs/kit').Load} */

export const load = async ({ fetch }) => {
	const response = await fetch(`api/imagesFetch`);
	const images:GalleryImage[] = await response.json();

    console.log(images.length)
	return {images:images};
};
