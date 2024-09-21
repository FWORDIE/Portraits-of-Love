import type Palette from 'node-vibrant';

export type Result = {
	images: ImageType[];
};

export type ImageType = {
	url: string;
	file_name: string;
	file_size: number;
	palette?: Palette;
	colour?: string;
	chosen?: boolean;
	prompt: string;
};

export type ImageWPal = {
	url: string;
	file_name: string;
	file_size: number;
};

export type userData = {
	id?: string;
	stages: stage[];
	note?: string;
	finalImg: ImageType | undefined | false;
};

export type miniImage = {
	id?: string;
	url: string;
	colour: string;
	chosen: boolean;
};

export type stage = {
	id?: string;
	fact: string | null;
	incitement: string;
	prompt: string;
	images: ImageType[];
};

export type GalleryImage = {
	image: string | undefined;
	date?: string;
	prompt: string[];
	data: dataImg | undefined;
};

export type dataImg = {
	src: string;
	width: number;
	height: number;
	alt: string;
	base64: string;
	bgColor: string;
};

export type stateType = 'home' | 'gallery' | 'about' | 'game';

export interface DatoData {
	allFacts: AllFact[];
	siteCopy: SiteCopy;
}

export interface AllFact {
	fact: string;
}

export interface SiteCopy {
	endText: string;
	anotherButtonText: string;
	errotText: string;
	aboutText: string;
	galleryButtonText: string;
	generationNoButton: string;
	generationYesButton: string;
	generatonText: string;
	incitementA: string;
	incitementAlwaysText: string;
	incitementB: string;
	incitementButton: string;
	incitementC: string;
	introButton: string;
	introText: string;
	noteText: string;
	preFactText: string;
	refineButtonText: string;
	refineText: string;
	selectButtonText: string;
	selectText: string;
	sendButtonText: string;
	sendText: string;
	shareItButtonText: string;
	startButtonText: string;
	subtitleText: string;
	termsNoButtonText: string;
	termsText: string;
	termsYesButtonText: string;
	title: string;
	restartText: string;
	restartButtonText: string;
	noImageText: string;
	promptNoteText: string;
	systemPrompt: string;
	noImageSmallText: string;
	introExhibitionText: string;
	printButtonText: string;
	emailPromptText: string;
	emailText: string;
	desktopWarningText: string;
	inactiveText: string;
	inactiveButtonResetText: string;
	inactiveButtonContinueText: string;
    printText:string;
}
