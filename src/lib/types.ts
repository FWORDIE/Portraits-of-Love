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
    prompt:string;
};

export type ImageWPal = {
	url: string;
	file_name: string;
	file_size: number;
};

export type userData = {
    id?:string;
    stages:stage[];
    finalImg:miniImage | undefined;
}

export type miniImage = {
    id?:string;
    url:string;
    colour:string;
    chosen:boolean;
}

export type stage = {
    id?:string;
    fact:string | null;
    incitement:string;
    prompt:string;
    images:miniImage[];
}

export type GalleryImage = {
    image:string | undefined;
    date:string;
    prompt:string[]
}

export type stateType = 'home' | 'gallery' | 'about' | 'game'