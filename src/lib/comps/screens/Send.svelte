<script lang="ts">
	import CopyBox from '../copyBox.svelte';
	import ScreenWrapper from '../screenWrapper.svelte';
	import { stageNumber, gameData, state, live } from '$lib/store';
	import ButtonBox from '../buttonBox.svelte';
	import type { DatoData, userData } from '$lib/types';
	import InputBox from '../inputBox.svelte';
	import { returnPromptArray } from '$lib/funcs';
	export let copy: DatoData;

	export let sent = false;

	const genEmailString = () => {
		let text = '';
		if ($gameData.finalImg) {
			text = copy.siteCopy.emailText;
			text = text.replaceAll('[IMG]', $gameData.finalImg.url);
			text = text.replaceAll('[PROMPT]', genPromptString($gameData, false));
		} else {
			text = copy.siteCopy.emailPromptText;
			text = text.replaceAll('[PROMPT]', genPromptString($gameData, true));
		}

		return encodeURIComponent(text);
	};

	const genPromptString = (gameData: userData, all = false) => {
		let prompt = '';
		let promptArray = returnPromptArray(gameData.stages, all);
		promptArray.map((stage) => {
			prompt = prompt + stage + '\n';
		});
		return prompt;
	};

	const send = () => {
		window.open(`mailto:${email}?subject=Potraits%20of%20Love&body=${genEmailString()}`, '_self');
		sent = true;
	};

	const print = () => {
		sent = true;
	};

	let email = '';
</script>

<ScreenWrapper>
	<CopyBox>
		{#if !$live}
			{@html copy.siteCopy.sendText}
		{:else}
			{@html copy.siteCopy.printText}
		{/if}
	</CopyBox>
	{#if !$live}
		<CopyBox bottom={true}>
			<InputBox small={true} bind:text={email}></InputBox>
		</CopyBox>
	{/if}
</ScreenWrapper>
<ButtonBox>
	{#if !$live && email.length > 0}
		<button class="textButton" on:click={() => send()}>
			{@html copy.siteCopy.sendButtonText}
		</button>
	{:else if $live}
		<button class="textButton" on:click={() => print()}>
			{@html copy.siteCopy.printButtonText}
		</button>
	{/if}
</ButtonBox>

<style lang="scss">
</style>
