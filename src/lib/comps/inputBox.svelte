<script lang="ts">

    export let text:string = '';

    let charLimit = 128

</script>

<div class="textAreaWrapper">
    <textarea placeholder="type here" bind:value={text} maxlength="128"></textarea>

    <div class="limitArea" class:red={charLimit == text.length}>
        {text.length}/{charLimit}
    </div>
    
</div>
<style lang="scss">

    .textAreaWrapper{
        position: relative;
        width: 100%;
        height: 100%;
        margin-bottom: var(--largePadding);

    }
    textarea{
        background-color: var(--background);
        border: var(--black) solid 1px;
        border-radius: var(--padding);;
        width: 100%;
        height: 100%;
        resize: none;
        padding: var(--padding);

        &:focus-visible{
            outline: none;
            border: var(--black) solid 1.5px;

        }
    }

    .limitArea{
        position: absolute;
        bottom: var(--padding);
        right: var(--padding);

        &.red{
            color: var(--red);
        }
    }
</style>