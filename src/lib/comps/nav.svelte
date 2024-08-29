<script lang="ts">
	import { backgroundGallery, state, bigItem } from '$lib/store';
	import type { stateType } from '$lib/types';
	import { fade } from 'svelte/transition';

	const changeState = (state: stateType) => {
		$state = state;
	};
</script>

<!-- {#if !$bigItem}
	<nav transition:fade={{ duration: 100 }}>
		{#if $state != 'home'}
			<button class="textButton small" on:click={() => changeState('home')}> Home </button>
		{/if}
		{#if $state != 'gallery'}
			<button class="textButton small" on:click={() => changeState('gallery')}> Gallery </button>
		{/if}
		{#if $state != 'about'}
			<button class="textButton small" on:click={() => changeState('about')}> About </button>
		{/if}
	</nav>
{/if} -->

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
</style>
