<script lang="ts">
	import Img from '$lib/comps/img.svelte';
	import Lenis from 'lenis';
	import ScrollTrigger from 'gsap';
	import gsap from 'gsap';
	import { onMount } from 'svelte';
	import { bigItem, backgroundGallery, state, moving } from '$lib/store';
	import type { GalleryImage } from '$lib/types';
	import { fade } from 'svelte/transition';

	export let images: GalleryImage[];

	let scrollDirection = -1;

	let speed = 1;

	let grid: HTMLElement;

	let lenis: Lenis;

	let lastDirection = -1;

	// let lastPos: number | boolean = null;

	onMount(() => {
		lenis = new Lenis({
			infinite: true,
			syncTouch: true,
			lerp: 0.9,
			syncTouchLerp: 0.9
		});

		lenis.on('scroll', (e) => {
			scrollDirection = e.direction;
			if (scrollDirection == 0) {
				scrollDirection == lastDirection;
				return;
			}
			lastDirection == scrollDirection;
		});

		//@ts-ignore
		lenis.on('scroll', ScrollTrigger.update);

		gsap.ticker.add((time) => {
			lenis.raf(time * 1000);
			let shouldScroll = lenis.velocity < 2.01 && lenis.velocity > -2.01 && !$moving && !$bigItem;
			if (shouldScroll) {
				let position = lenis.animatedScroll;
				if (position == 0) {
					console.log(position);
				}
				if (scrollDirection == 0) {
					scrollDirection = -1;
				}
				lenis.scrollTo(speed * scrollDirection + position, {
					duration: 0.001,
					easing: (t) => 1 - Math.cos((t * Math.PI) / 2),
					lerp: 0.9,
					lock: $backgroundGallery,
					force: true
				});
			} else if ($bigItem) {
			}
		});

		gsap.ticker.lagSmoothing(0);
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

<div class="wrapper">
	{#each { length: 2 } as _, i}
		<div class="grid" bind:this={grid} class:clone={i == 1} class:background={$backgroundGallery}>
			{#each images as image, i}
				<div class="grid__item">
					<Img {image} offset={(i + 2) % 3 == 0}></Img>
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

<style lang="scss">
	.wrapper {
		overflow-x: hidden;
		display: flex;
		align-items: center;
		flex-direction: column;
		background-color: var(--background);

		.overlay {
			transition: all 500ms ease;
			background-color: var(--darkBack);
			position: fixed;
			height: 100%;
			width: 100%;
			z-index: 1;
			pointer-events: none;
			opacity: 0;

			&.visable.light {
				background-color: var(--background);
				opacity: 0.95;
			}

			&.visable.dark {
				background-color: var(--darkBack);
				opacity: 0.5;
			}
		}
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
