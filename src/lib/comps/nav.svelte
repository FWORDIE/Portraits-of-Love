<script lang="ts">
	import { backgroundGallery, state, bigItem, gameData, stageNumber } from '$lib/store';
	import type { stateType } from '$lib/types';
	import { fade } from 'svelte/transition';
	export let copy;
	const changeState = (state: stateType) => {
		$state = state;
	};

	const reset = () => {
		$stageNumber = -1;
		//Add sending function
		$gameData = {
			stages: [],
			finalImg: undefined,
			note: undefined
		};
		$gameData = $gameData;
		changeState('home');
	};
</script>

{#if !$bigItem}
	<nav transition:fade={{ duration: 100 }}>
		{#if $state != 'game'}
			{#if $state != 'home'}
				<button class="textButton small" on:click={() => changeState('home')}> Home </button>
			{/if}
			{#if $state != 'gallery'}
				<button class="textButton small" on:click={() => changeState('gallery')}> Gallery </button>
			{/if}
			{#if $state != 'about'}
				<button class="textButton small" on:click={() => changeState('about')}> About </button>
			{/if}
		{:else}
			<button class="title" on:click={reset}>{copy.siteCopy.title}</button>
		{/if}
	</nav>
{/if}

<style lang="scss">
	nav {
		position: fixed;
		top: var(--padding);
		left: 50%;
		z-index: 9;
		transform: translate(-50%, 0%);
		display: flex;
		gap: var(--padding);
		z-index: 4;
	}

	.title {
		font-size: var(--font-size-md);
		color: var(--black);
		font-family: 'EB Garamond';
		font-weight: 800;
		width: 100%;
		text-align: center;
		background-color: transparent;
		border: 0px;
	}
</style>
