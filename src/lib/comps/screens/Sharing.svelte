<script lang="ts">
	import CopyBox from '../copyBox.svelte';
	import ScreenWrapper from '../screenWrapper.svelte';
	import { stageNumber, gameData, state, maxStages } from '$lib/store';
	import ButtonBox from '../buttonBox.svelte';
	import type { DatoData } from '$lib/types';
	import { onMount } from 'svelte';
	export let copy: DatoData;

	export let sharing: boolean;

	$: tries = $maxStages - ($stageNumber + 1);

	const sharePrompt = () => {
		$gameData.finalImg = false;
		$gameData = $gameData;
		sharing = true;
	};

	const refineFunc = () => {
		console.log('REFINE');
		$stageNumber = $stageNumber + 1;
	};

	onMount(() => {
		if ($gameData.finalImg != undefined) {
			sharing = true;
		}
	});
</script>

<ScreenWrapper>
	<CopyBox>
		{@html copy.siteCopy.refineText}
		{#if $stageNumber + 1 >= $maxStages}
			{@html copy.siteCopy.errotText}
		{/if}
	</CopyBox>
</ScreenWrapper>
<ButtonBox>
	{#if $maxStages > $stageNumber + 1}
		<button class="textButton" on:click={refineFunc}>
			{@html copy.siteCopy.refineButtonText}
			({tries} {tries == 1 ? "try" : "tries"} left)
		</button>
	{:else}
		<button class="textButton" on:click={() => sharePrompt()}> Share prompt </button>
	{/if}
	{#if $gameData.finalImg === undefined}
		<button class="textButton" on:click={() => (sharing = true)}>
			{@html copy.siteCopy.shareItButtonText}
		</button>
	{/if}
</ButtonBox>

<style lang="scss">
</style>
