<script lang="ts">
	import Gallery from '$lib/comps/gallery.svelte';
	import '$lib/scss/global.scss';
	import { bigItem, stageNumber, state, gameData } from '$lib/store.js';
	export let data;

	$: console.log($gameData, $stageNumber);
</script>

<slot></slot>
{#if $state != 'game'}
	<Gallery images={data.images} copy={data.copy}></Gallery>
{/if}

<style lang="scss">
</style>
