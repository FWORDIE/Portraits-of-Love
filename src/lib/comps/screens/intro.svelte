<script lang="ts">
	import { PUBLIC_LIVE } from '$env/static/public';
	import { stageNumber } from '$lib/store';
	import type { DatoData } from '$lib/types';
	import ButtonBox from '../buttonBox.svelte';
	import CopyBox from '../copyBox.svelte';
	import ScreenWrapper from '../screenWrapper.svelte';

	export let copy: DatoData;

	const next = () => {
		$stageNumber = $stageNumber + 1;
	};
</script>

<ScreenWrapper>
	<CopyBox>
		{#if PUBLIC_LIVE == 'true'}
			{@html copy.siteCopy.introExhibitionText}
		{:else}
			{@html copy.siteCopy.introText}
		{/if}
	</CopyBox>
</ScreenWrapper>
<ButtonBox>
	<button class="textButton" on:click={next}>
		{copy.siteCopy.introButton}
	</button>
</ButtonBox>

<style lang="scss">
</style>
