<script lang="ts">
	import Img from '$lib/comps/img.svelte';
	import Lenis from 'lenis';
	import ScrollTrigger from 'gsap';
	import gsap from 'gsap';
	import { onMount } from 'svelte';
	import { bigItem, backgroundGallery, state, moving } from '$lib/store';
	import type { GalleryImage } from '$lib/types';
	import { fade, scale } from 'svelte/transition';
	import { delay } from '$lib/funcs';
	export let copy;
	export let images: GalleryImage[];

	let scrollDirection = -1;

	let speed = 1;

	let grid: HTMLElement;

	let lenis: Lenis;

	let lastDirection = -1;

	export let loaded = false;

	// async function loadImages(imageUrlArray: GalleryImage[]) {
	// 	const promiseArray = []; // create an array for promises
	// 	const imageArray: HTMLImageElement[] = []; // array for the images

	// 	for (let imageUrl of imageUrlArray) {
	// 		if (imageUrl.image != undefined) {
	// 			promiseArray.push(
	// 				new Promise<void>((resolve) => {
	// 					const img = new Image();
	// 					// if you don't need to do anything when the image loads,
	// 					// then you can just write img.onload = resolve;

	// 					img.onload = function () {
	// 						// do stuff with the image if necessary

	// 						// resolve the promise, indicating that the image has been loaded
	// 						resolve();
	// 					};
	// 					if (imageUrl.image) {
	// 						img.src = imageUrl.image;
	// 					}
	// 					imageArray.push(img);
	// 				})
	// 			);
	// 		}
	// 	}

	// 	await Promise.all(promiseArray); // wait for all the images to be loaded
	// 	console.log('all images loaded');
	// 	return imageArray;
	// }

	// let lastPos: number | boolean = null;

	onMount(async () => {
		// loadImages(images).then((images) => {
		// 	console.log('loaded');
		// 	loaded = true;
		// 	// the loaded images are in the images array
		// });

		lenis = new Lenis({
			infinite: true,
			syncTouch: true,
			lerp: 0.9,
			syncTouchLerp: 0.9
		});

		lenis.on('scroll', (e) => {
			scrollDirection = e.direction;
			if (scrollDirection == 0 || !scrollDirection) {
				scrollDirection = lastDirection;
				return;
			}
			lastDirection = scrollDirection;
		});

		//@ts-ignore
		lenis.on('scroll', ScrollTrigger.update);

		gsap.ticker.add((time) => {
			lenis.raf(time * 1000);
			let shouldScroll =
				lenis.velocity < 2.01 &&
				lenis.velocity > -2.01 &&
				!$moving &&
				!$bigItem &&
				$state != 'game';
                // console.log(shouldScroll,scrollDirection)
			if (shouldScroll) {
				lenis.start();
				let position = lenis.scroll;
				lenis.scrollTo(speed * scrollDirection + position, {
					duration: 0.001,
					easing: (t) => 1 - Math.cos((t * Math.PI) / 2),
					lerp: 0.9,
					lock: $backgroundGallery
					// force: true
				});
			} else if ($bigItem) {
				lenis.stop();
			}
		});

		gsap.ticker.lagSmoothing(0);

        await delay(1000)

        loaded = true;

	});

	const adjustBackground = (state: string) => {
		if (state == 'gallery') {
			$backgroundGallery = false;
		} else {
			$backgroundGallery = true;
		}
	};

	$: adjustBackground($state);
</script>

{#if loaded}
	<div class="wrapper" transition:fade={{ duration: 600 }}>
		{#each { length: 2 } as _, i}
			<div
				class="grid"
				bind:this={grid}
				class:clone={i == 1}
				class:background={$backgroundGallery && loaded}
			>
				{#each images as image, i}
					<div class="grid__item">
						<Img
							{copy}
							{image}
							offset={(i + 2) % 3 == 0}
							toggleButton={image.image ? 'none' : 'info'}
						></Img>
					</div>
				{/each}
			</div>
		{/each}
		{#if $bigItem}
			<div
				class="overlay light visable"
				in:fade={{ duration: 300 }}
				out:fade={{ duration: 150, delay: 200 }}
			></div>
		{/if}
		<div class="overlay dark" class:visable={$backgroundGallery}></div>
	</div>
{/if}

<style lang="scss">
	.wrapper {
		// overflow-x: hidden;
		display: flex;
		align-items: center;
		flex-direction: column;
		background-color: var(--background);
	}
	.clone {
		max-height: calc(100dvh - 2 * var(--halfPadding));
		overflow: visible;
		// z-index: 1;
	}
	.grid {
		display: grid;
		grid-template-columns: 1fr 1fr 1fr;
		width: calc(100dvw - 3 * var(--halfPadding));
		align-content: flex-start;
		overflow: visible;
		margin: var(--halfPadding);
		margin-bottom: var(--halfPadding);
		row-gap: var(--padding);
		column-gap: var(--padding);
		transition: width 400ms cubic-bezier(0.25, 1, 0.5, 1);

		&.background {
			width: calc(120dvw - 2 * var(--halfPadding));
			pointer-events: none;
		}
		.grid__item {
			width: 100%;
			background-size: cover;
			overflow: visible;
			position: relative;

			// background-position: 50% 20%;
		}
	}
</style>
