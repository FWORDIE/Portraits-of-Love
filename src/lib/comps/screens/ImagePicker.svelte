<script lang="ts">
	import ButtonBox from '../buttonBox.svelte';
	import CopyBox from '../copyBox.svelte';
	import ScreenWrapper from '../screenWrapper.svelte';
	import { bigItem, gameData, maxStages, stageNumber } from '$lib/store';
	import type { DatoData } from '$lib/types';
	import Img from '../img.svelte';
	import { fade } from 'svelte/transition';

	let select = false;

	export let copy: DatoData;
	$: tries = $maxStages - ($stageNumber + 1);

	const next = () => {
		select = true;
	};
	let chosen = -1;
	let restart = false;

	const choose = (i: number) => {
		if (chosen == i) {
			chosen = -1;
			return;
		}
		chosen = i;
	};

	const confirmChoice = () => {
		if (chosen > -1) {
			$gameData.stages[$stageNumber].images[chosen].chosen = true;
			$gameData = $gameData;
		}
	};

	const restartFunc = () => {
		console.log('RESTART');
		$stageNumber = $stageNumber + 1;
	};

	const sharePrompt = () => {
		$gameData.finalImg = false;
		$gameData = $gameData;
	};
</script>

{#if $gameData.stages[$stageNumber] != undefined && $gameData.finalImg != false && !$gameData.stages[$stageNumber].images.some((image) => image.chosen)}
	<ScreenWrapper>
		<div class="imagePicker">
			{#each $gameData.stages[$stageNumber].images as image, i}
				<div class="grid__item">
					<Img
						image={{
							image: image.url,
							prompt: [$gameData.stages[$stageNumber].prompt],
							data: undefined
						}}
						showPrompt={false}
						{copy}
						toggleButton="none"
					></Img>
					{#if select && !$bigItem}
						<button
							class="outer"
							on:click={() => choose(i)}
							out:fade={{ duration: 300 }}
							in:fade={{ duration: 300, delay: 300 }}
						>
							{#if chosen == i}
								<div class="inner"></div>
							{/if}
						</button>
					{/if}
				</div>
			{/each}
		</div>
	</ScreenWrapper>
	{#if !select}
		{#if !restart}
			<ScreenWrapper>
				<CopyBox>
					{@html copy.siteCopy.generatonText}
				</CopyBox>
			</ScreenWrapper>
			{#if !$bigItem}
				<ButtonBox>
					<button class="textButton" on:click={() => (restart = true)}>
						{@html copy.siteCopy.generationNoButton}
					</button>
					<button class="textButton" on:click={next}>
						{@html copy.siteCopy.generationYesButton}
					</button>
				</ButtonBox>
			{/if}
		{:else}
			<ScreenWrapper>
				<CopyBox>
					{#if $maxStages > $stageNumber + 1}
						{@html copy.siteCopy.restartText}
					{:else}
						{@html copy.siteCopy.errotText}
					{/if}
				</CopyBox>
			</ScreenWrapper>
			{#if !$bigItem}
				<ButtonBox>
					{#if $maxStages > $stageNumber + 1}
						<button class="textButton" on:click={restartFunc}>
							{@html copy.siteCopy.restartButtonText}
							({tries}
							{tries == 1 ? 'try' : 'tries'} left)
						</button>
					{:else}
						<button class="textButton" on:click={() => sharePrompt()}> Share prompt </button>
					{/if}
					<button class="textButton" on:click={() => (restart = false)}> Back </button>
				</ButtonBox>
			{/if}
		{/if}
	{:else}
		<ScreenWrapper>
			<CopyBox>
				{@html copy.siteCopy.selectText}
			</CopyBox>
		</ScreenWrapper>

		{#if chosen > -1}
			<ButtonBox>
				<button class="textButton" on:click={confirmChoice}>
					{@html copy.siteCopy.selectButtonText}
				</button>
			</ButtonBox>
		{/if}
	{/if}

	{#if $bigItem}
		<div
			class="overlay light visable"
			in:fade={{ duration: 300 }}
			out:fade={{ duration: 150, delay: 200 }}
		></div>
	{/if}
{/if}

<style lang="scss">
	.imagePicker {
		display: grid;
		grid-template-rows: 1fr 1fr;
		grid-template-columns: 1fr 1fr;
		flex: 1;
		gap: var(--padding);
		padding: var(--largePadding);
		max-height: 50vh;
		max-width: 50vh;
	}

	.grid__item {
		position: relative;
		button.outer {
			position: absolute;
			bottom: var(--halfPadding);
			right: var(--halfPadding);
			z-index: 9;
			width: var(--largePadding);
			height: var(--largePadding);
			background: transparent;
			border-radius: var(--padding);
			border: var(--white) 2px solid;
			box-shadow: var(--shadowOne);
			padding: 3px;

			.inner {
				height: 100%;
				width: 100%;
				background-color: var(--white);
				border-radius: var(--padding);
			}
		}
	}
</style>
