<script lang="ts">
	import { receive, send } from '$lib/crossfade';
	import { delay } from '$lib/funcs';
	import { onDestroy, onMount, tick } from 'svelte';
	import { fade } from 'svelte/transition';

	let key = 'key';
	let hidden = true;

	onMount(async () => {
		await delay(300);
        // await tick()
		hidden = false;
	});


</script>

	<div class="wrapper" class:hidden  in:fade|global={{ duration: 300, delay: 300 }}  out:fade|global={{ duration: 300 }} >
		<slot></slot>
	</div>

<style lang="scss">
	.wrapper {
		height: 100%;
        display: flex;
        flex-direction: column;
	}
	.hidden {
		height: 0px;
        overflow: hidden;
	}
</style>
