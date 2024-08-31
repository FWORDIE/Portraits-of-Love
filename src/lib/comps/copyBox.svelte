<script lang="ts">
	import { receive, send } from "$lib/crossfade";

    let key = 'cross'
</script>

<div class="copyBox" >
    <slot></slot>
</div>

<style lang="scss">
    .copyBox{
        padding: var(--largePadding);
        padding-top: 0px;
        text-align: center;
        box-sizing: border-box;
        width: 100%;
        height: 100%;
        flex: 1;
        display: flex;
        align-items: center;
        flex-direction: column;
        justify-content: center;
        :global(p){
            margin-bottom: var(--padding);
        }
        :global(p:last-of-type){
            margin-bottom: 0px;
        }
    }
    
</style>