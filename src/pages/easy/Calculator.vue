<script setup>
    import Calculator from '@/utils/class/Calculator';
    import { ref } from 'vue';

    const buttons = [
        'C','D','(',')',
        '7','8','9','*',
        '4','5','6','/',
        '1','2','3','-',
        '.','0','00','+',
    ]
    
    let operation = ref("");
    const result = ref(0)
    const stack = [];
    const clickBtn = (str) => {
        if (stack.length > 1) stack.shift()
        switch (str) {
            case "C": operation.value = ""; result.value = 0; break;
            case "D": 
                operation.value = operation.value.slice(0, -1);
                if (operation.value == "") result.value = 0;
                break;
            default: operation.value += str; break;
        }

        const evaluate = new Calculator(operation.value).evaluate();
        if (isNaN(evaluate)) {
            result.value = stack[stack.length - 1]
        } else {
            stack.push(evaluate);
            result.value = evaluate
        }
    }

</script>

<template>
    <section>
        <p class="result">{{ result }}</p>
        <p class="operation">{{ operation || 0 }}</p>
        <ul class="btn-wrapper">
            <li v-for="(item, key) in buttons" :class="`btn-${item}`" :key>
                <button type="button" @click="clickBtn(item)" 
                    v-if="['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '00', '.'].includes(item)" class="gray">
                    {{ item }}
                </button>
                <button type="button" @click="clickBtn(item)" 
                    v-else-if="['(', ')'].includes(item)" class="khaki">
                    {{ item }}
                </button>
                <button type="button" @click="clickBtn(item)" 
                    v-else-if="['C', 'D'].includes(item)" class="red">
                    {{ item }}
                </button>
                <button type="button" @click="clickBtn(item)" 
                    v-else class="goldenrod">
                    {{ item }}
                </button>
            </li>
        </ul>
    </section>
</template>

<style scoped>
    section {
        padding: 10px;
        border-radius: 20px;
        overflow: hidden;
        background-color: white;
        width: 90%;
        margin: auto;
    }

    .result {
        padding: 10px;
        text-align: right;
        font-size: 1.5rem;
        border-bottom: 1px solid black;
    }
    
    .operation {
        padding: 10px;
        text-align: right;
        font-size: 1.5rem;
        font-style: italic;
    }

    .btn-wrapper {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        border-top: 0px;
        border-radius: 16px;
        overflow: hidden;
    }

    li {
        aspect-ratio: 1/1;
    }
    
    button {
        width: 100%;
        height: 100%;
        font-size: 1.5rem;
        border: 0px;
        outline: 1px solid white;
        color: white;
        cursor: pointer;
        position: relative;
    }

    .gray {
        background-color: gray;
    }

    .gray:hover {
        background-color: rgba(128, 128, 128, .8);
    }

    .gray:active {
        background-color: rgba(128, 128, 128, .5);
    }

    .khaki {
        background-color: rgb(189, 183, 107);
    }

    .khaki:hover {
        background-color: rgba(189, 183, 107, .8);
    }

    .khaki:active {
        background-color: rgba(189, 183, 107, .5);
    }

    .red {
        background-color: rgb(220, 0, 0);
    }

    .red:hover {
        background-color: rgba(220, 0, 0, .8);
    }

    .red:active {
        background-color: rgba(220, 0, 0, .5);
    }

    .goldenrod {
        background-color: rgb(184, 134, 11);
    }

    .goldenrod:hover {
        background-color: rgba(184, 134, 11, .8);
    }

    .goldenrod:active {
        background-color: rgba(184, 134, 11, .5);
    }
</style>