<script lang="ts">
	export let text: string = '';
	export let small = false;

	let charLimit = 128;
</script>

<div class="textAreaWrapper">
	{#if !small}
		<textarea placeholder="type here" bind:value={text} maxlength="128"></textarea>

		<div class="limitArea" class:red={charLimit == text.length}>
			{text.length}/{charLimit}
		</div>
	{:else}
		<input placeholder="type here" type="text" bind:value={text} maxlength="128" />
	{/if}
</div>

<style lang="scss">
	.textAreaWrapper {
		position: relative;
		width: 100%;
		height: 50%;
		margin-bottom: var(--largePadding);
		margin-top: var(--padding);
		// margin-top: 50%;
	}
	textarea,
	input {
		background-color: var(--background);
		border: var(--black) solid 1px;
		border-radius: var(--padding);
		width: 100%;
		height: 100%;
		resize: none;
		padding: var(--padding);

		&:focus-visible {
			outline: none;
			border: var(--black) solid 1.5px;
		}
	}

    input{
        height: auto;
    }

	.limitArea {
		position: absolute;
		bottom: var(--padding);
		right: var(--padding);

		&.red {
			color: var(--red);
		}
	}
</style>
