import type { stage } from './types';

export function getRandomArbitrary(min: number, max: number) {
	return Math.random() * (max - min) + min;
}

export const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

export function randomIntFromInterval(min: number, max: number) {
	// min and max included
	return Math.floor(Math.random() * (max - min + 1) + min);
}

export const returnPromptArray = (stages: stage[]) => {
	let promptArray: string[] = [];

	stages.map((stage: stage) => {
		promptArray.push(stage.prompt);
	});

	return promptArray;
};
