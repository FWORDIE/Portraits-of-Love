<script lang="ts">
	import ButtonBox from '../buttonBox.svelte';
	import CopyBox from '../copyBox.svelte';
	import { gameData, maxStages, stageNumber } from '$lib/store';
	import type { DatoData, GalleryImage, ImageType, miniImage } from '$lib/types';
	import { randomIntFromInterval } from '$lib/funcs';
	import InputBox from '../inputBox.svelte';
	import Loading from './Loading.svelte';
	import ScreenWrapper from '../screenWrapper.svelte';

	export let copy: DatoData;

	const getIncitement = () => {
		if ($stageNumber == 0) {
			return copy.siteCopy.incitementA;
		} else if ($stageNumber == 1) {
			return randomIntFromInterval(-2, 2) > 0
				? copy.siteCopy.incitementC
				: copy.siteCopy.incitementB;
		} else {
			return $gameData.stages[1].incitement == copy.siteCopy.incitementB
				? copy.siteCopy.incitementC
				: copy.siteCopy.incitementB;
		}
	};
	let incitement = getIncitement();

	let text: string = '';
	let loading = false;

	const genImg = async (prompt: string) => {
		let generatedImages: any[] = [];

		const getImage = () => {
			let image;
			if ($gameData.stages[$stageNumber - 1]) {
				image =
					$gameData.stages[$stageNumber - 1].images.find((image) => image.chosen) || undefined;
			}
			if (image) {
				return image.url;
			}
			return '';
		};

		const getPrompt = (prompt: string) => {
			let returnPrompt = '';

			for (let i = 0; i < $gameData.stages.length; i++) {
				if (
					$gameData.stages[i] &&
					$gameData.stages[i].images.length > 0 &&
					$gameData.stages[i].images.some((image) => image.chosen)
				) {
					returnPrompt += $gameData.stages[i].prompt;
					returnPrompt += ', ';
				}
			}

			returnPrompt += prompt;
			return returnPrompt;
		};

		if (prompt) {
			loading = true;
			await fetch(
				'/api/imageGen?' +
					new URLSearchParams({
						system: copy.siteCopy.systemPrompt,
						prompt: getPrompt(prompt),
						model: 'schnell',
						number: '4',
						image: getImage()
					}).toString()
			)
				.then((response) => {
					if (response.status >= 400 && response.status < 600) {
						throw new Error('Bad response from server');
					}
					return response;
				})
				.then(async (returnedResponse) => {
					generatedImages = await returnedResponse.json();
					console.log(generatedImages);
					// Your response to manipulate
				})
				.catch((error) => {
					// Your error is here!
					console.log(error);
				})
				.finally(() => {
					loading = false;
				});
		}
		return generatedImages as ImageType[];
	};

	const generate = async () => {
		if (text.length > 0 && $gameData.stages.length < $stageNumber + 1) {
			$gameData.stages = [
				...$gameData.stages,
				{
					incitement: incitement,
					prompt: text,
					images: [],
					fact: null
				}
			];
			$gameData.stages[$stageNumber].images = await genImg(text);
		}
	};
</script>

{#if !loading}
	<ScreenWrapper>
		<CopyBox>
			{@html copy.siteCopy.incitementAlwaysText}
			{@html incitement}
            {#if $gameData.stages.length > 0}
            {#each $gameData.stages as stage}
                {#if stage.images.some((image) => image.chosen)}
                    <p class="italic">{stage.prompt}...</p>
                {/if}
            {/each}
        {/if}
		</CopyBox>
		<CopyBox bottom={true}>
			<InputBox bind:text></InputBox>
		</CopyBox>
	</ScreenWrapper>
	{#if text.length > 0}
		<ButtonBox>
			<button class="textButton" on:click={generate}>
				{copy.siteCopy.incitementButton}
			</button>
		</ButtonBox>
	{/if}
{:else}
	<ScreenWrapper>
		<Loading {copy}></Loading>
	</ScreenWrapper>
{/if}

<style lang="scss">
</style>
