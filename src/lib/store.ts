import { writable } from 'svelte/store';
import type { stateType, userData } from './types';

export const bigItem = writable(false);

export const backgroundGallery = writable(true);

export const state = writable<stateType>('game');

export const moving = writable(false);

export const gameData = writable<userData>({
	stages: [],
	finalImg: undefined,
    note:undefined
});

export let stageNumber = writable(-1);

export let maxStages = writable(2);


