<script setup>

    defineProps({
        item: Object,
        voidDone: Function,
        voidUpdate: Function,
        voidDelete: Function,
    })


</script>
<template>
    <section :class="['popup', item.isDone() ? 'coral':'green', item.isShow() ? 'active' : 'not-active']">
        <button :class="[item.isDone() ? 'undone' : 'done']" type="button" @click="voidDone(item.getID())"></button>
        <button class="update" type="button" @click="voidUpdate(item.getID())"></button>
        <button class="delete" type="button" @click="voidDelete(item.getID())"></button>
    </section>
</template>

<style>
    .popup {
        position: absolute;
        width: fit-content;
        height: 100%;
        top: 0;
        right: 0px;
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 0px 10px;
    }

    .popup.green {
        background-color: lightgreen;
    }

    .popup.coral {
        background-color: lightcoral;
    }

    .popup button {
        border: 1px solid rgba(0, 0, 0, .5);
        aspect-ratio: 1/1;
        border-radius: 50%;
        height: 50%;
    }
    
    .not-active {
        display: none;
    }
    
    .popup .done {
        background-color: lightcoral;
    }

    .popup .undone {
        background-color: lightgreen;
    }

    .popup .update {
        background-color: lightblue;

    }

    .popup .delete {
        background-color: rgb(255, 183, 50);
    }
</style>