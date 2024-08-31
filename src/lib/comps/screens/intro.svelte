<script lang="ts">
	import { stageNumber } from '$lib/store';
	import ButtonBox from '../buttonBox.svelte';
	import CopyBox from '../copyBox.svelte';
	import ScreenWrapper from '../screenWrapper.svelte';

	export let copy;

	const next = () => {
		$stageNumber = $stageNumber + 1;
	};
</script>

<ScreenWrapper>
	<CopyBox>
		{@html copy.siteCopy.introText}
	</CopyBox>
</ScreenWrapper>
<ButtonBox>
	<button class="textButton" on:click={next}>
		{copy.siteCopy.introButton}
	</button>
</ButtonBox>

<style lang="scss">
</style>
