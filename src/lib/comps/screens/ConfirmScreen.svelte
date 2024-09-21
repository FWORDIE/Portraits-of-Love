<script lang="ts">
	import ButtonBox from '../buttonBox.svelte';
	import CopyBox from '../copyBox.svelte';
	import ScreenWrapper from '../screenWrapper.svelte';
	import { bigItem, gameData, maxStages, stageNumber, state } from '$lib/store';
	import type { DatoData, ImageType, SiteCopy } from '$lib/types';
	import Img from '../img.svelte';
	import InputBox from '../inputBox.svelte';
	import { goto } from '$app/navigation';
	import { returnPromptArray } from '$lib/funcs';
	import { tick } from 'svelte';
	import End from './End.svelte';
	import Send from './Send.svelte';
	import Terms from './Terms.svelte';
	import Note from './Note.svelte';
	import Sharing from './Sharing.svelte';
	import SingleImage from './SingleImage.svelte';
	export let copy: DatoData;

	let sharing = false;

	let sent: boolean = false;
    let uploaded = false
</script>

<SingleImage {copy}></SingleImage>
{#if !sharing}
	<Sharing {copy} bind:sharing></Sharing>
{:else if !$gameData.note}
	<Note {copy}></Note>
{:else if !uploaded}
	<Terms {copy} bind:uploaded bind:sent></Terms>
{:else if !sent}
	<Send bind:sent {copy}></Send>
{:else if sent}
	<End {copy}></End>
{/if}

<style lang="scss">
</style>
