<script lang="ts">
	import { stageNumber, gameData } from '$lib/store';
	import type { DatoData } from '$lib/types';
	import { fade } from 'svelte/transition';

	import Intro from './screens/intro.svelte';
	import Generator from './screens/Generator.svelte';
	import ImagePicker from './screens/ImagePicker.svelte';
	import ConfirmScreen from './screens/ConfirmScreen.svelte';

	export let copy: DatoData;
</script>

<div class="gameWrapper" in:fade={{ duration: 1200 }}>
	{#if $stageNumber < 0}
		<Intro {copy}></Intro>
	{:else if $stageNumber >= 0}
		{#if !$gameData.stages[$stageNumber] || $gameData.stages[$stageNumber].images.length < 1}
			<Generator {copy}></Generator>
		{:else if $gameData.stages[$stageNumber].images.length > 1}
			{#if !$gameData.stages[$stageNumber].images.some((image) => image.chosen) && $gameData.finalImg != false}
				<ImagePicker {copy}></ImagePicker>
			{:else}
				<ConfirmScreen {copy}></ConfirmScreen>
			{/if}
		{/if}
	{/if}
</div>

<style lang="scss">
	.gameWrapper {
		height: 100dvh;
		width: 100dvw;
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		align-content: space-between;
		justify-content: center;
		z-index: 4;
        padding-block: var(--largePadding);
        align-items: center;
		// position: relative;
	}
</style>
