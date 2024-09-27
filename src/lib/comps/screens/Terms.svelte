<script lang="ts">
	import CopyBox from '../copyBox.svelte';
	import ScreenWrapper from '../screenWrapper.svelte';
	import { stageNumber, gameData, state, live } from '$lib/store';
	import ButtonBox from '../buttonBox.svelte';
	import type { DatoData, ImageType } from '$lib/types';
	export let copy: DatoData;
    let print: boolean;

	let image = $gameData.stages[$stageNumber].images.find((image) => image.chosen) as ImageType;

	export let uploaded = false;
	let uploading = false;

	const terms = async (upload: boolean, shouldPrint = false) => {
		if ($gameData.finalImg === undefined) {
			$gameData.finalImg = image;
		}
		$gameData = $gameData;
		//Add Upload function
		if (upload) {
			uploading = true;
			await fetch('/api/pocket', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					gameData: $gameData
				})
			})
				.then((response) => {
					if (response.status >= 400 && response.status < 600) {
						throw new Error('Bad response from server');
					}
					return response;
				})
				.then(async (uploadResponse) => {
					uploadResponse = await uploadResponse.json();
					console.log(uploadResponse);
					// Your response to manipulate
				})
				.catch((error) => {
					// Your error is here!
					console.log(error);
				})
				.finally(() => {
					uploading = false;
					uploaded = true;
				});
		}
        if(shouldPrint){
            print = true
        }
	};
</script>

<ScreenWrapper>
	<CopyBox>
		{#if !$live}
			{@html copy.siteCopy.termsText}
		{:else}
			{@html copy.siteCopy.termsTextPrint}
		{/if}
	</CopyBox>
</ScreenWrapper>
<ButtonBox
	>{#if !uploading}
		{#if !$live}
			<button class="textButton" on:click={() => terms(false)}>
				{@html copy.siteCopy.termsNoButtonText}
			</button>
			<button class="textButton" on:click={() => terms(true)}>
				{@html copy.siteCopy.termsYesButtonText}
			</button>
		{:else}
            <button class="textButton" on:click={() => terms(false, false)}>
				{@html copy.siteCopy.termsNoButtonTextPrint}
			</button>
			<button class="textButton" on:click={() => terms(true, true)}>
				{@html copy.siteCopy.termsYesButtonTextPrint}
			</button>
		{/if}
	{:else}
		uploading...
	{/if}
</ButtonBox>

<style lang="scss">
</style>
