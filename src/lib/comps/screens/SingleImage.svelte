<script lang="ts">
    import ScreenWrapper from "../screenWrapper.svelte";
    import{stageNumber, gameData} from '$lib/store'
    import type { DatoData, ImageType } from "$lib/types";
	import Img from "../img.svelte";
	import { returnPromptArray } from "$lib/funcs";
    export let copy:DatoData;

    let image =$gameData.stages[$stageNumber].images.find((image) => image.chosen) as ImageType;
</script>
<ScreenWrapper>
	<div class="imageContainer">
		<Img
			image={{
				image: image ? image.url : undefined,
				prompt: returnPromptArray($gameData.stages)
			}}
			showPrompt={false}
			disable={true}
			toggleButton={'prompt'}
			{copy}
		></Img>
	</div>
</ScreenWrapper>
<style lang="scss">
    
	.imageContainer {
		padding: var(--largePadding);
		border-radius: var(--padding);
	}
</style>