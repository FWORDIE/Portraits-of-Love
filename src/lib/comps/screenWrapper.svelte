<script lang="ts">
	import { receive, send } from '$lib/crossfade';
	import { delay } from '$lib/funcs';
	import { onDestroy, onMount, tick } from 'svelte';
	import { fade } from 'svelte/transition';

	let key = 'key';
	let hidden = true;

	onMount(async () => {
        console.log('munted')
		await delay(300);
        // await tick()
		hidden = false;
	});

	// onDestroy(async()=>{
	// 	hidden = true;
	//     await delay(700);

	// })
</script>

{#key 'help'}
	<div class="wrapper" in:fade|global={{ duration: 300, delay: 300 }}  out:fade|global={{ duration: 300 }}  class:hidden>
		<slot></slot>
	</div>
{/key}

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
