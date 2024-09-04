<script lang="ts">
	import { fly } from 'svelte/transition';

	export let delayOut = 0;
</script>

<div
	class="buttonBox"
	in:fly|global={{ duration: 300, opacity: 0, y: 100, delay: 300 }}
	out:fly|global={{ duration: 300, opacity: 0, y: 50, delay: delayOut }}
>
	<slot></slot>
</div>

<style lang="scss">
	.buttonBox {
		position: fixed;
		bottom: var(--padding);
		left: 50%;
		transform: translate(-50%, 0);
		z-index: 20;
        display: flex;
        justify-content: center;
        width: 100%;
        gap: var(--padding);
	}
</style>
