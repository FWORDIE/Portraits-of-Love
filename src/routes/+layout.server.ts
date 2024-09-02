import { performRequest } from '$lib/datocms.js';
import type { GalleryImage } from '$lib/types.js';
import { executeQuery } from '@datocms/cda-client';

const query = `
query all {
  allFacts {
    fact
  }
  siteCopy {
    endText(markdown: true)
    anotherButtonText
    errotText(markdown: true)
    aboutText(markdown: true)
    galleryButtonText
    generationNoButton
    generationYesButton
    generatonText(markdown: true)
    incitementA(markdown: true)
    incitementAlwaysText(markdown: true)
    incitementB(markdown: true)
    incitementButton
    incitementC(markdown: true)
    introButton
    introText(markdown: true)
    noteText(markdown: true)
    preFactText(markdown: true)
    refineButtonText
    refineText(markdown: true)
    selectButtonText
    selectText(markdown: true)
    sendButtonText
    sendText(markdown: true)
    shareItButtonText
    startButtonText
    subtitleText(markdown: true)
    termsNoButtonText
    termsText(markdown: true)
    termsYesButtonText
    title
    restartText(markdown: true)
    restartButtonText
    noImageText(markdown: true)
    promptNoteText(markdown: true)
  }
}`;

/** @type {import('@sveltejs/kit').Load} */

export const load = async ({ fetch }) => {
	const response = await fetch(`api/imagesFetch`);
	const images: GalleryImage[] = await response.json();

	const copy = await performRequest(query);
	return { images: images, copy: copy };
};
