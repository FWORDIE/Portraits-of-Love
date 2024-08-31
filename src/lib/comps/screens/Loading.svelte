<script lang="ts">
	import ButtonBox from '../buttonBox.svelte';
	import CopyBox from '../copyBox.svelte';
	import { gameData, stageNumber } from '$lib/store';
	import type { DatoData } from '$lib/types';
	import { randomIntFromInterval } from '$lib/funcs';

	export let copy: DatoData;

	let fact = copy.allFacts[randomIntFromInterval(0, copy.allFacts.length - 1)];
	import { onMount } from 'svelte';
	onMount(() => {
		$gameData.stages[$stageNumber].fact = fact.fact;
	});
</script>

<CopyBox>
	{@html copy.siteCopy.preFactText}
	{@html fact.fact}
</CopyBox>

<style lang="scss">
</style>
