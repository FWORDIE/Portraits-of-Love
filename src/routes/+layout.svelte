<script lang="ts">
	import Gallery from '$lib/comps/gallery.svelte';
	import '$lib/scss/global.scss';
    import {bigItem} from '$lib/store.js'
    export let data;

    $:console.log($bigItem)
</script>

<slot></slot>
<Gallery images={data.images}></Gallery>

<style lang="scss">
</style>
