<script lang="ts">
	import { gameData, stageNumber } from '$lib/store';
	import Generator from './Generator.svelte';
	import ImagePicker from '$lib/comps/screens/ImagePicker.svelte';
	import type { DatoData } from '$lib/types';
	import ConfirmScreen from './ConfirmScreen.svelte';

	export let copy: DatoData;
	// const back = () => ($stageNumber = $stageNumber - 1);
</script>

{#if !$gameData.stages[$stageNumber] || $gameData.stages[$stageNumber].images.length < 1}
	<Generator {copy}></Generator>
{:else if $gameData.stages[$stageNumber].images.length > 1}
	{#if !$gameData.stages[$stageNumber].images.some((image) => image.chosen) && $gameData.finalImg != false}
		<ImagePicker {copy}></ImagePicker>
	{:else}
		<ConfirmScreen {copy}></ConfirmScreen>
	{/if}
{/if}

<style lang="scss">
</style>
