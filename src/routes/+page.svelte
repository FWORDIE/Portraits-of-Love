<script lang="ts">
	import ButtonBox from '$lib/comps/buttonBox.svelte';
	import Game from '$lib/comps/game.svelte';
	import Nav from '$lib/comps/nav.svelte';
	import { backgroundGallery, state } from '$lib/store';
	import type { DatoData, stateType } from '$lib/types.js';
	import { fade } from 'svelte/transition';

	export let data;

	let copy: DatoData = data.copy as DatoData;

	const openGallery = () => {
		$backgroundGallery = !$backgroundGallery;
	};

	const changeState = (state: stateType) => {
		$state = state;
	};
</script>

{#if $state != 'game'}
	<Nav></Nav>
{/if}
{#if $state == 'home'}
	<div class="titleWrapper" transition:fade={{ duration: 300 }}>
		<h1 class="title">Portraits of Love</h1>
	</div>
	<ButtonBox>
		<button class="textButton invert" on:click={() => changeState('game')}>
			{copy.siteCopy.startButtonText}
		</button>
	</ButtonBox>
{/if}

{#if $state == 'game'}
	<Game {copy}></Game>
{/if}

<style lang="scss">
	.titleWrapper {
		position: fixed;
		z-index: 3;
		top: 0;
		left: 0;
		height: 100%;
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		h1 {
			font-size: var(--font-size-xxxl);
			color: var(--white);
			font-family: 'EB Garamond';
			font-weight: 800;
			width: 90%;
			text-align: center;
			pointer-events: none;
			user-select: none;
		}
	}
</style>
