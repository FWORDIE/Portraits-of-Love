<script lang="ts">
	import Gallery from '$lib/comps/gallery.svelte';
	import '$lib/scss/global.scss';
	import { bigItem, stageNumber, state, gameData } from '$lib/store.js';
	export let data;

	let loaded: boolean;

	$: console.log($gameData, $stageNumber);
</script>

{#if loaded}
	<slot></slot>
{/if}
{#if $state != 'game'}
	<Gallery images={data.images} copy={data.copy} bind:loaded></Gallery>
{/if}

<style lang="scss">
</style>
