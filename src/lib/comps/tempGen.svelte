<script lang="ts">
	import type { ImageType } from '$lib/types';
	import Image from './image.svelte';

	let prompt: string =
		'5-foot, 60-years old tanned asian woman with round belly, big smiley eyes, in a wild garden of herbs, flowers, giant monstera,';

	let generatedImages: ImageType[] = [];
	let generating = false;

	const genImg = async (prompt: string) => {
		if (prompt) {
			generating = true;
			await fetch(
				'/api/imageGen?' +
					new URLSearchParams({
						prompt
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
					generating = false;
				});
		}
	};

	let uploading = false;

	const upload = async (image: ImageType) => {
		if (image) {
			uploading = true;
			await fetch('/api/pocket', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					prompt: image.prompt,
					image: image.url,
					chosen: true,
					colour: image.colour || ''
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
				});
		}
	};
</script>

<div class="fullheight">
	<div class="input">
		<h1>Image Gen</h1>
		<textarea bind:value={prompt} rows="4" cols="50" maxlength="140"></textarea>
		{#if !generating}
			<button on:click={() => genImg(prompt)}>Submit</button>
		{:else}
			Loading...
		{/if}
	</div>
	{#if generatedImages[0]}
		<Image image={generatedImages[0]} raised={true}></Image>
	{/if}
	{#if generatedImages.length > 0}
		<div class="control">
			{#if !uploading}
				<button on:click={() => upload(generatedImages[0])}>Upload</button>
			{:else}
				Uploading...
			{/if}
		</div>
	{/if}
</div>

<style lang="scss">
	.fullheight {
		height: calc(100dvh - 2 * var(--padding));
		width: calc(100% - 2 * var(--padding));
		color: var(--white);
		padding: var(--padding);
		display: flex;
		align-items: center;
		justify-items: flex-start;
		flex-direction: column;
		font-size: var(--baseFont);
		gap: var(--largePadding);
		.input {
			display: flex;
			align-items: center;
			justify-items: flex-start;
			flex-direction: column;
			gap: var(--padding);
			h1 {
				font-size: var(--font-size-xl);
			}
			textarea {
				border: none;
				border-radius: var(--halfPadding);
				padding: var(--halfPadding);
			}
			button {
				padding: var(--halfPadding);
				border-radius: var(--halfPadding);
			}
		}
	}
</style>
