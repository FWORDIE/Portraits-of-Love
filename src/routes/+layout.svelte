<script lang="ts">
	import ButtonBox from '$lib/comps/buttonBox.svelte';
	import CopyBox from '$lib/comps/copyBox.svelte';
	import Gallery from '$lib/comps/gallery.svelte';
	import ScreenWrapper from '$lib/comps/screenWrapper.svelte';
	import '$lib/scss/global.scss';
	import { bigItem, stageNumber, state, gameData, live } from '$lib/store.js';
	import type { DatoData } from '$lib/types.js';
	export let data;
	let copy: DatoData = data.copy as DatoData;

	let loaded: boolean;
	let idleTime = 0;
	let inactive = false;

	import { onMount } from 'svelte';
	onMount(() => {
		var idleInterval = setInterval(timerIncrement, 60000); // 1 minute

		$live = data.live;
	});

	function timerIncrement() {
		idleTime = idleTime + 1;
		if (idleTime > 5 && !inactive) {
			// 20 minutes
			inactive = true;
		}
	}

	function reset() {
		idleTime = 0;
		console.log('reset');
	}

	const end = async (gotoGallery: boolean) => {
		$stageNumber = -1;
		//Add sending function
		$gameData = {
			stages: [],
			finalImg: undefined,
			note: undefined
		};
		$gameData = $gameData;
		inactive = false;
		idleTime = 0;
		if (gotoGallery) {
			$state = 'home';
		} else {
			$state = 'home';
		}
	};

	$: console.log($gameData, $stageNumber);
</script>

<svelte:body on:mousedown={reset} />
<div class="mob">
	{#if loaded}
		<slot></slot>
	{/if}
	{#if $state != 'game'}
		<Gallery images={data.images} copy={data.copy} bind:loaded></Gallery>
	{/if}
	{#if inactive}
		<div class="alertBox">
			<ScreenWrapper>
				<CopyBox>
					{@html copy.siteCopy.inactiveText}
				</CopyBox>
				<ButtonBox>
					<button
						class="textButton invert"
						on:click={() => {
							inactive = false;
							idleTime = 0;
						}}
					>
						{@html copy.siteCopy.inactiveButtonContinueText}
					</button>
					<button class="textButton invert" on:click={() => end(false)}>
						{@html copy.siteCopy.inactiveButtonResetText}
					</button>
				</ButtonBox>
			</ScreenWrapper>
		</div>
	{/if}
</div>
<div class="noMob">
	<h1 class="title">{copy.siteCopy.title}</h1>

	{@html copy.siteCopy.desktopWarningText}
</div>

<style lang="scss">
	.mob {
		display: block;
	}
	.alertBox {
		position: fixed;
		z-index: 9999;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		height: 100dvh;
		width: 100%;
		background-color: var(--darkBack);
		top: 0;
		left: 0;
		color: var(--white);
	}
	.noMob {
		display: none;
	}
	@media only screen and (min-width: 700px) {
		.noMob {
			display: flex;
			justify-content: center;
			align-items: center;
			height: 100dvh;
			.title {
				font-size: var(--font-size-xl);
				color: var(--black);
				font-family: 'EB Garamond';
				font-weight: 800;
				margin-bottom: var(--padding);
			}
			flex-direction: column;
		}
		.mob {
			display: none;
		}
	}
</style>
