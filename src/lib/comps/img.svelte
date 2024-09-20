<script lang="ts">
	import { delay, getRandomArbitrary } from '$lib/funcs';
	import { bigItem, moving } from '$lib/store';
	import type { DatoData, GalleryImage } from '$lib/types';
	import gsap from 'gsap';
	import Flip from 'gsap/dist/Flip';
	import { onMount, tick } from 'svelte';
	import { fade, fly } from 'svelte/transition';
	import ButtonBox from './buttonBox.svelte';
	import ScreenWrapper from './screenWrapper.svelte';
	import CopyBox from './copyBox.svelte';
	import { lazyLoad } from '$lib/funcs';
	import { Image as DatoImg } from '@datocms/svelte';

	export let image: GalleryImage;
	export let offset: boolean = false;
	export let showPrompt = true;
	export let toggleButton: string;
	export let disable = false;

	export let copy: DatoData;

	let imgElem: HTMLElement;
	let buttonElem: HTMLElement;
	let imageArea: HTMLElement;
	let promptArea: HTMLElement;

	let toggled = false;
	let state: any;

	let fullscreen = false;

	onMount(async () => {
		console.log(image);
		gsap.registerPlugin(Flip);
	});

	let scale = getRandomArbitrary(70, 80);
	let y = getRandomArbitrary(-10, 10);
	let x = getRandomArbitrary(-10, 10);

	const makeBigger = async (overRide: boolean = false) => {
		if (disable && !overRide) {
			return;
		}
		state = Flip.getState([imageArea, buttonElem]);
		await tick();

		if (!buttonElem.classList.contains('fullscreen')) {
			$bigItem = true;
			fullscreen = true;
			// disable = true;
		} else {
			$bigItem = false;
			fullscreen = false;
			toggled = false;
			await delay(150);
		}
		buttonElem.classList.toggle('fullscreen');

		Flip.from(state, {
			duration: 0.3,
			ease: 'power1.inOut',
			absolute: true,
			zIndex: 10,
			props: 'opacity, backgroundColor',
			onStart: function () {
				$moving = true;
			},
			onComplete: function () {
				$moving = false;
			}
		});
	};
</script>

<button
	class="imageWrapper"
	on:click={() => makeBigger()}
	bind:this={buttonElem}
	class:offset
	disabled={fullscreen}
>
	<div class="imageArea" bind:this={imageArea}>
		{#if image.image}
			{#if image.data}
				<DatoImg class="imgLike" data={image.data} fadeInDuration={300}></DatoImg>
			{:else}
				<img src={image.image} alt="Generated output based of your prompt" />
			{/if}
		{:else}
			<div class="imgLike noImg">
				{#if fullscreen || toggleButton == 'prompt'}
					<h1 in:fade={{ duration: 150, delay: 300 }} out:fade={{ duration: 150 }}>
						{@html copy.siteCopy.noImageSmallText}
					</h1>
				{/if}
			</div>
		{/if}
		{#if (fullscreen && toggleButton == 'info') || toggleButton == 'prompt'}
			{#if !toggled}
				<button
					class="textButton small invert onImage"
					on:click={() => (toggled = true)}
					in:fade|global={{ duration: 300, delay: 300 }}
					out:fade|global={{ duration: 300 }}
				>
					{toggleButton == 'info' ? 'More info' : 'Show prompt'}
				</button>
			{:else}
				<button
					on:click={() => (toggled = false)}
					class="textButton small invert onImage"
					in:fade|global={{ duration: 300, delay: 300 }}
					out:fade|global={{ duration: 300 }}
				>
					{toggleButton == 'info' ? 'Back' : 'Show image'}
				</button>
				<div
					class="toggledState"
					in:fade|global={{ duration: 300, delay: 300 }}
					out:fade|global={{ duration: 200 }}
				>
					<CopyBox>
						{@html toggleButton == 'info' ? copy.siteCopy.noImageText : image.prompt}
					</CopyBox>
				</div>
			{/if}
		{/if}
	</div>
	{#if showPrompt && fullscreen}
		<div
			class="promptArea"
			bind:this={promptArea}
			in:fade={{ duration: 300, delay: 300 }}
			out:fade={{ duration: 150 }}
		>
			{#each image.prompt as prompt}
				<p>{prompt}</p>
			{/each}
		</div>
	{/if}
</button>

{#if fullscreen}
	<ButtonBox delayOut={200}>
		<button class="textButton" on:click={() => makeBigger(true)}>Close</button>
	</ButtonBox>
{/if}

<style lang="scss">
	.imageWrapper {
		width: 100%;
		height: 100%;
		background-color: transparent;
		border: none;
		outline: none;
		// z-index: 5;
		padding: 0px;
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: space-between;
		text-decoration: none;
		cursor: pointer;
		// transition: all 300ms;
		&.offset {
			margin-top: -50%;
		}

		.imageArea {
			flex: 1;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			align-items: center;
			width: 100%;
			box-sizing: border-box;
			position: relative;

			&:only-child {
				justify-content: center;
			}
			:global(.imgLike) {
				border-radius: var(--quatPadding);
				box-shadow: var(--shadowOne);
				width: 100%;
				transition: all 300ms;
				position: relative;

				&.noImg {
					background-color: var(--black);
					width: 100%;
					padding-bottom: 100%;
					display: flex;
					justify-content: center;
					align-items: center;
					position: relative;

					h1 {
						position: absolute;
						top: 50%;
						left: 50%;
						transform: translate(-50%, -50%);
						color: var(--white);
						text-align: center;
						margin: 0px;
						font-family: 'EB Garamond';
						width: 100%;
					}
				}
			}

			img {
				max-width: 100%;
				margin: 0px;
				padding: 0px;
				display: block;
			}
		}
		.promptArea {
			flex: auto;
			display: flex;
			flex-direction: column;
			justify-content: center;
			overflow: scroll;
			gap: var(--quatPadding);
			p {
				text-decoration: none;
				color: var(--black);
				text-align: center;
				margin: 0px;
			}
		}

		.onImage {
			position: absolute;
			left: var(--padding);
			bottom: var(--padding);
			z-index: 20;
			cursor: pointer;
		}

		.toggledState {
			padding-top: var(--largePadding);
			color: var(--white);
			position: absolute;
			left: 0px;
			top: 0;
			width: 100%;
			height: 100%;
			z-index: 19;
			background-color: var(--darkBack);
			display: flex;
			justify-content: center;
			align-items: center;
		}
	}
</style>
