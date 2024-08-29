<script lang="ts">
	import { delay, getRandomArbitrary } from '$lib/funcs';
	import { bigItem, moving } from '$lib/store';
	import type { GalleryImage } from '$lib/types';
	import gsap from 'gsap';
	import Flip from 'gsap/dist/Flip';
	import { onMount, tick } from 'svelte';
	import { fade, fly } from 'svelte/transition';
	export let image: GalleryImage;
	let imgElem: HTMLElement;
	let buttonElem: HTMLElement;
	let imageArea: HTMLElement;
	let promptArea: HTMLElement;
	export let offset: boolean;
	export let showPrompt = true;

	let state: any;

	let fullscreen = false;

	onMount(async () => {
		gsap.registerPlugin(Flip);
	});

	let scale = getRandomArbitrary(70, 80);
	let y = getRandomArbitrary(-10, 10);
	let x = getRandomArbitrary(-10, 10);

	const makeBigger = async () => {
		state = Flip.getState([imageArea, buttonElem]);
		await tick();

		if (!buttonElem.classList.contains('fullscreen')) {
			$bigItem = true;
			fullscreen = true;
		} else {
			$bigItem = false;
			fullscreen = false;
			await delay(200);
		}
		buttonElem.classList.toggle('fullscreen');

		Flip.from(state, {
			duration: 0.3,
			ease: 'power1.inOut',
			absolute: true,
			zIndex: 30,
			props: 'opacity',
			onStart: function () {
				$moving = true;
			},
			onComplete: function () {
				$moving = false;
			}
		});

		// $bigItem = false;
		// fullscreen = false;

		// $bigItem = !$bigItem;
	};
</script>

<button class="imageWrapper" on:click={() => makeBigger()} bind:this={buttonElem} class:offset>
	<div class="imageArea" bind:this={imageArea}>
		{#if image.image}
			<img class="imgLike" bind:this={imgElem} src={image.image} alt="" />
		{:else}
			<div class="imgLike noImg">
				{#if fullscreen}
					<h1 transition:fade={{ duration: 150, delay: 300 }}>No Image</h1>
				{/if}
			</div>
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
	<div
		class="buttonBox"
		in:fly={{ duration: 300, opacity: 0, y: 100 }}
		out:fly={{ duration: 300, opacity: 0, y: 50, delay:150 }}
	>
		<button class="textButton" on:click={() => makeBigger()}>Close</button>
	</div>
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
			.imgLike {
				border-radius: var(--quatPadding);
				box-shadow: var(--shadowOne);
				width: 100%;
				transition: all 300ms;
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
			overflow: hidden;
			p {
				text-decoration: none;
				color: var(--black);
				text-align: center;
				margin: 0px;
			}
		}
	}
</style>
