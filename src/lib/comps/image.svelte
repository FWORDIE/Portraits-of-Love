<script lang="ts">
	import type { ImageType } from '$lib/types';

	export let image: ImageType;

    export let raised;
</script>

<div class="imageWrapper">
	<div class="poliriod">
		<div class="image">
			<div class="roughness"></div>
			<img src={image.url} alt="" />
		</div>
	</div>
</div>

<style lang="scss">
	.imageWrapper {
		flex: 1;
		width: 100%;
		padding-block: var(--extraLargePadding);
		overflow: hidden;
		margin-bottom: var(--padding);
		color: var(--black);
		display: flex;
		flex-direction: column;
		gap: var(--largePadding);
		align-items: center;
		justify-content: center;
		font-size: var(--font-size-md);
		// background-color: var(--background);

		.poliriod {
            box-shadow:
				rgba(17, 17, 26, 0.3) 0px 4px 16px 0px inset;
			width: 70%;
			padding: 1%;
			background-color: var(--background);
            &.raised {
                box-shadow:
                rgba(50, 50, 93, 0.25) 0px 13px 27px -5px,
				rgba(0, 0, 0, 0.3) 0px 8px 16px -8px,
				rgba(17, 17, 26, 0.1) 0px 4px 16px 0px inset;
            }
			.text {
				padding-block: 2vw;
				margin: 0px;
				text-align: center;
				font-family: 'Courier New', Courier, monospace;
			}
			.image {
				width: 100%;
				position: relative;
				// background-color: transparent;

				img {
					max-width: 100%;
					width: 100%;
					margin: 0px;
					padding: 0px;
					position: relative;
					display: block;
				}
				.roughness {
					position: absolute;
					top: 0;
					left: 0;
					width: 100%;
					height: 100%;
					box-shadow: rgba(17, 17, 26, 0.2) 0px 4px 16px 0px inset;
					z-index: 1;
				}
			}
		}
	}
	.pal {
		display: flex;
		justify-content: space-between;
		gap: var(--padding);
		.swatch {
			display: flex;
			flex-direction: column;
			align-items: center;
			gap: var(--halfPadding);
		}
		.circle {
			border-radius: var(--largePadding);
			height: var(--largePadding);
			width: var(--largePadding);
		}
	}
</style>
