<script lang="ts">
	import CopyBox from '../copyBox.svelte';
	import ScreenWrapper from '../screenWrapper.svelte';
	import { stageNumber, gameData, state } from '$lib/store';
	import ButtonBox from '../buttonBox.svelte';
	import type { DatoData } from '$lib/types';
	export let copy: DatoData;

	const end = async (gotoGallery: boolean) => {
		$stageNumber = -1;
		//Add sending function
		$gameData = {
			stages: [],
			finalImg: undefined,
			note: undefined
		};
		$gameData = $gameData;
		if (gotoGallery) {
			$state = 'home';
		} else {
			$state = 'home';
		}
	};
</script>

{#key $gameData}
	{#if $stageNumber > -1}
		<ScreenWrapper>
			<CopyBox>
				{@html copy.siteCopy.endText}
			</CopyBox>
		</ScreenWrapper>
		<ButtonBox>
			<button class="textButton" on:click={() => end(false)}>
				{@html copy.siteCopy.anotherButtonText}
			</button>
			<button class="textButton" on:click={() => end(true)}>
				{@html copy.siteCopy.galleryButtonText}
			</button>
		</ButtonBox>
	{/if}
{/key}

<style lang="scss">
</style>
