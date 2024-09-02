<script lang="ts">
	import CopyBox from "../copyBox.svelte";
	import ScreenWrapper from "../screenWrapper.svelte";
    import{stageNumber, gameData, state} from '$lib/store'
	import ButtonBox from "../buttonBox.svelte";
	import type { DatoData } from "$lib/types";
    export let copy:DatoData;

	export let sent = false;

	const send = () => {
		sent = true;
	};

</script>

<ScreenWrapper>
    <CopyBox>
        {@html copy.siteCopy.sendText}
    </CopyBox>
</ScreenWrapper>
<ButtonBox>
    <button class="textButton" on:click={() => send()}>
        {@html copy.siteCopy.sendButtonText}
    </button>
</ButtonBox>
<style lang="scss">
    
</style>