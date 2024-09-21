<script lang="ts">
	import CopyBox from '../copyBox.svelte';
	import ScreenWrapper from '../screenWrapper.svelte';
	import { stageNumber, gameData, state } from '$lib/store';
	import ButtonBox from '../buttonBox.svelte';
	import type { DatoData } from '$lib/types';
	import InputBox from '../inputBox.svelte';
	export let copy: DatoData;

	let note = '';
	const addNote = () => {
		if (note.length > 0) {
			$gameData.note = note;
			$gameData = $gameData;
		}
	};
</script>

<ScreenWrapper bottom ={true}>
    <CopyBox bottom ={true} only={true}>
        {@html $gameData.finalImg == false ? copy.siteCopy.promptNoteText : copy.siteCopy.noteText}
        <InputBox bind:text={note}></InputBox>

    </CopyBox>

</ScreenWrapper>
{#if note.length > 0}
	<ButtonBox>
		<button class="textButton" on:click={() => addNote()}> Share </button>
	</ButtonBox>
{/if}

<style lang="scss">
</style>
