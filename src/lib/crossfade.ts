import { quintOut } from 'svelte/easing';
import { crossfade, fade } from 'svelte/transition';

export const [send, receive] = crossfade({
	duration:600,
    easing: quintOut,
    

});
