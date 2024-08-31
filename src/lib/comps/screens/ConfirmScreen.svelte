<script lang="ts">
	import ButtonBox from '../buttonBox.svelte';
	import CopyBox from '../copyBox.svelte';
	import ScreenWrapper from '../screenWrapper.svelte';
	import { bigItem, gameData, maxStages, stageNumber, state } from '$lib/store';
	import type { DatoData, ImageType, SiteCopy } from '$lib/types';
	import Img from '../img.svelte';
	import InputBox from '../inputBox.svelte';
	import { goto } from '$app/navigation';
	export let copy: DatoData;

	let note = '';

	let sharing = true;
	let image = $gameData.stages[$stageNumber].images.find((image) => image.chosen) as ImageType;

	const addNote = () => {
		if (note.length > 0) {
			$gameData.note = note;
			$gameData = $gameData;
		}
	};

	const terms = (upload: boolean) => {
		//Add Upload function

		$gameData.finalImg = image;
		$gameData = $gameData;
	};

	let sent = false;

	const send = () => {
		//Add sending function
		sent = true;
	};

	const end = (gotoGallery: boolean) => {
		$stageNumber = -1;
		//Add sending function
		$gameData = {
			stages: [],
			finalImg: undefined,
			note: undefined
		};
		$gameData = $gameData;
		if (gotoGallery) {
			$state = 'gallery';
		}
	};
</script>

<ScreenWrapper>
	<div class="imageContainer">
		<Img
			image={{ image: image ? image.url : undefined, prompt: [$gameData.stages[$stageNumber].prompt] }}
			showPrompt={false}
			disable={true}
		></Img>
	</div>
</ScreenWrapper>
{#if !sharing}
	<ScreenWrapper>
		<CopyBox>
			{@html copy.siteCopy.refineText}
		</CopyBox>
	</ScreenWrapper>
	<ButtonBox>
		<button class="textButton">
			{@html copy.siteCopy.refineButtonText}
			({$maxStages - ($stageNumber + 1)} trys left)
		</button>
		<button class="textButton" on:click={() => (sharing = true)}>
			{@html copy.siteCopy.shareItButtonText}
		</button>
	</ButtonBox>
{:else if !$gameData.note}
	<ScreenWrapper>
		<CopyBox>
			{@html copy.siteCopy.noteText}
			<InputBox bind:text={note}></InputBox>
		</CopyBox>
	</ScreenWrapper>
	{#if note.length > 0}
		<ButtonBox>
			<button class="textButton" on:click={() => addNote()}>
				{@html copy.siteCopy.shareItButtonText}
			</button>
		</ButtonBox>
	{/if}
{:else if !$gameData.finalImg}
	<ScreenWrapper>
		<CopyBox>
			{@html copy.siteCopy.termsText}
		</CopyBox>
	</ScreenWrapper>
	<ButtonBox>
		<button class="textButton" on:click={() => terms(false)}>
			{@html copy.siteCopy.termsNoButtonText}
		</button>
		<button class="textButton" on:click={() => terms(true)}>
			{@html copy.siteCopy.termsYesButtonText}
		</button>
	</ButtonBox>
{:else if !sent}
	<ScreenWrapper>
		<CopyBox>
			{@html copy.siteCopy.sendText}
		</CopyBox>
	</ScreenWrapper>
	<ButtonBox>
		<button class="textButton" on:click={() => send()}>
			{@html copy.siteCopy.sendButtonText}
		</button>
	</ButtonBox>
{:else}
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

<style lang="scss">
	.imageContainer {
		padding: var(--largePadding);
		border-radius: var(--padding);
	}
</style>
