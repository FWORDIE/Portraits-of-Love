import { writable } from 'svelte/store';
import type { stateType } from './types';

export const bigItem = writable(false);

export const backgroundGallery = writable(true);

export const state = writable<stateType>('gallery')

export const moving = writable(false)