<script lang="ts">
	import { receive, send } from '$lib/crossfade';

	let key = 'cross';

	export let bottom = false;
    export let only = false
</script>

<div class="copyBox" class:bottom class:only>
	<slot></slot>
</div>

<style lang="scss">
	.copyBox {
		padding: var(--largePadding);
		padding-top: 0px;
		text-align: center;
		box-sizing: border-box;
		width: 100%;
		// height: 100%;
		flex: 1;
		display: flex;
		align-items: center;
		flex-direction: column;
		justify-content: center;
        max-width: calc(50vh + (2 * var(--largePadding)));
		&.bottom {
			justify-content: flex-end;
            flex: 0.5;

            &.only{
                flex: 1;
            }
		}
		:global(p) {
			margin-bottom: var(--padding);
		}
		:global(p:last-of-type) {
			margin-bottom: 0px;
		}
	}
</style>
