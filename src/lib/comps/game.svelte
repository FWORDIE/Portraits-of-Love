<script lang="ts">
	import { stageNumber } from '$lib/store';
	import type { DatoData } from '$lib/types';
	import { fade } from 'svelte/transition';

	import Intro from './screens/intro.svelte';
	import MainLoop from './screens/mainLoop.svelte';

	export let copy: DatoData;

	const forward = () => ($stageNumber = $stageNumber + 1);
</script>

<div class="gameWrapper" transition:fade={{ duration: 300 }}>
	{#if $stageNumber < 0}
		<Intro {copy}></Intro>
	{:else if $stageNumber >= 0}
		<MainLoop {copy}></MainLoop>
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
		// position: relative;
	}
</style>
