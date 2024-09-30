<script lang="ts">
	import { onMount } from 'svelte';
    import { createEventDispatcher } from 'svelte';

    const dispatch = createEventDispatcher();

    function printDone() {
        dispatch('printDone');
    }
	export let image;
	export let prompt;

    let printJS: any;
	onMount(async ()=>{
		const p = await import('print-js')
		printJS = p.default

		let fontSize = "16px";
		if (prompt.length < 64){
			fontSize = "32px";
		} else if (prompt.length < 128){
			fontSize = "24px";
		} else if (prompt.length < 256){
			fontSize = "20px";
		}
		console.log("fontSize: ", fontSize);
		printJS({ printable: 'printContent', type:'html', onPrintDialogClose: printDone, scanStyles: false, style: `

		@font-face {
			font-display: swap;
			font-family: 'Gap Sans';
			font-style: normal;
			font-weight: 900;
			src: url('/fonts/GapSansBlack.ttf') format('truetype');
		}

		* {
			margin: 0px;
			padding: 0px;
		}

		.printContent {
			margin: 0px;
			padding: 0px;

			width: 100%;

			display: flex;
			flex-direction: column;
			align-items: center;

			background-color: white;
		}

		.finalImage {
			width: 100%;
		}

		.finalImage img {
			width: 100%;
		}

		.prompttext {
			height: 150px;
			display: flex;
			flex-direction: row;
			align-items: center;
			justify-content: space-around;
			font-family: "Gap Sans", sans-serif;
			font-size: ${fontSize};
            font-weight: 900;
			text-align: center;
			color: black;
			width: 90%;
		}
		@media print {
			header,footer {
				display: none;
			}
		}
	`});
	})


</script>

<div id="printContent" class="printContent">
	<div class="finalImage"><img src={image} alt="" /></div>
	<div class="prompttext">{ prompt }</div>
</div>

<style lang="scss">
	.printContent {
		display: none;
	}
</style>
