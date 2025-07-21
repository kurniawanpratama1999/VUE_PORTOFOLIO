<script setup>


    defineProps({
        hook: Object,
        setting: Object,
    })

</script>

<template>
    <section :class="['expense-control', setting.isControl ? 'active':'not-active']">
        <div class="wrapper">
            <label for="date">
                <span>Date :</span>
                <input type="date" name="date" id="date" v-model="hook.date" required>
            </label>

            <label for="transaction">
                <span>Transaction :</span>
                <input type="text" name="transaction" id="transaction" v-model="hook.transaction" placeholder="name of transaction" required>
            </label>

            <label for="nominal">
                <span>Nominal :</span>
                <input type="number" name="nominal" id="nominal" v-model="hook.nominal" placeholder="0.00" required>
            </label>

            <select name="dc" id="dc" v-model="hook.debet">
                <option value="true">Debet</option>
                <option value="false">Credit</option>
            </select>

            <button type="button" @click="setting.btnSave(item)" class="save">Save</button>
            <button type="button" @click="setting.btnClose" class="close">Close</button>
        </div>
    </section>
</template>

<style lang="css" scoped>

    section {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        padding: 10px;
        background-color: rgba(245, 245, 245, 0.7);
        backdrop-filter: blur(2px);
        border-radius: 5px;
        
    }

    section .wrapper {
        background-color: whitesmoke;
        padding: 10px;
        border-radius: 5px;
        box-shadow: 0px 0px 5px black;
        display: grid;
        grid-template-areas: 
        'date date'
        'tran tran'
        'nomi nomi'
        'dorc dorc'
        'save clos';
        grid-template-columns: repeat(2, 1fr);
        column-gap: 10px;
        row-gap: 15px;
    }

    section.not-active {
        display: none;
    }

    label[for="date"] {
        grid-area: date;
        display: flex;
        flex-direction: column;
        background-color: white;
        padding: 5px;
        border: 1px solid rgba(0, 0, 0, 0.3);
    }
    label[for="date"] span {
        font-size: .8rem;
        margin-bottom: 2px;
        font-style: italic;
    }
    label[for="date"] input {
        background-color: transparent;
        border: 0;
        outline: 0;
    }
    
    label[for="transaction"] {
        grid-area: tran;
        display: flex;
        flex-direction: column;
        background-color: white;
        padding: 5px;
        border: 1px solid rgba(0, 0, 0, 0.3);
    }
    label[for="transaction"] span {
        font-size: .8rem;
        margin-bottom: 2px;
        font-style: italic;
    }
    label[for="transaction"] input {
        background-color: transparent;
        border: 0;
        outline: 0;
    }
    
    label[for="nominal"] {
        grid-area: nomi;
        display: flex;
        flex-direction: column;
        background-color: white;
        padding: 5px;
        border: 1px solid rgba(0, 0, 0, 0.3);
    }
    label[for="nominal"] span {
        font-size: .8rem;
        margin-bottom: 2px;
        font-style: italic;
    }
    label[for="nominal"] input {
        background-color: transparent;
        border: 0;
        outline: 0;
    }
    
    select#dc {
        background-color: whitesmoke;
        border: 1px solid rgba(0, 0, 0, 0.3);
        padding: 5px;
    }

    button.save {
        grid-area: save;
        height: 35px;
        border: 1px solid green;
        background-color: lightgreen;
    }
    button.close {
        grid-area: clos;
        height: 35px;
        border: 1px solid black;
        background-color: lightgray;
    }


</style>