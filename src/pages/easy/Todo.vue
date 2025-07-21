<script setup>
import TodoPopup from '@/components/TodoPopup.vue';
import { TodoControl } from '@/utils/class/TodoControl.js';
import { computed, reactive, ref } from 'vue';

const todoControl = new TodoControl()


const record = reactive({
    count: 0,
    memoUpdate: null,
    input: '',
    isDropdown: false,
    isScroll: false,
    optionVal: "",
    undone: false,
    done: false,
})

// normalnya kosong atau ambil dari database
todoControl.add({id: record.count += 1, task: 'sleep'})
todoControl.add({id: record.count += 1, task: 'eat'})
todoControl.add({id: record.count += 1, task: 'exercise'})
todoControl.add({id: record.count += 1, task: 'homework'})
todoControl.add({id: record.count += 1, task: 'coding'})
todoControl.add({id: record.count += 1, task: 'coffee'})
todoControl.add({id: record.count += 1, task: 'tea'})
todoControl.add({id: record.count += 1, task: 'cooking'})
todoControl.add({id: record.count += 1, task: 'play game'})
todoControl.add({id: record.count += 1, task: 'study'})

// cuma tampilin yang udah selesai
const done = ref(false) 

// nantinya buat undo dan redo
const recordActivity = reactive([]) 

// event handler untuk toggle dropdown
const btnDropDown = () => {
    record.isDropdown = !record.isDropdown
    record.isScroll = false
}

// event handler untuk toggle scroll
const btnScroll = () => {
    record.isScroll = !record.isScroll
    record.isDropdown = record.isScroll
}

// ini untuk control mau di update, delete, atau di tandain udah selesai (sebaliknya)
const btnControl = (id) => {
    const todo = todoControl.getData({id})
    todoControl.update({id, isShow: !todo.isShow()})
};

// anak dari btnControl kalo belum selesai ubah ke selesai (sebaliknya)
const btnDone = (id) => {
    const todo = todoControl.getData({id})
    todoControl.update({id, isDone: !todo.isDone()})
}

// anak dari btnControl kalo belum selesai ubah ke selesai (sebaliknya)
const btnUpdate = (id) => {
    record.memoUpdate = todoControl.getData({id});
    record.input = record.memoUpdate.getTask()
}

// anak dari btnControl apus tapi berdasarkan id
const btnDelete = (id) => {todoControl.delete({id})}


// jadi ketika memoUpdate bernilai true maka 
// input bertujuan untuk merubah value yang akand di update
// tapi ketika memo update bernilai false maka
// input bertujuan untuk menambah task baru
const btnNew = () => {
    if (record.memoUpdate) {
        const id = record.memoUpdate.getID();
        todoControl.update({id, task: record.input})
        record.memoUpdate = null;
        record.input = ""
        console.log('update form todo')
    } else {
        const id = record.count += 1;
        todoControl.add({id, task: record.input})
        record.input = "";
    }
}

// nah ini toggle yang untuk merubah nilai dari undsleepone ref
const btnUndone = computed(() => {
    record.undone = !record.undone
    record.done = false
})

// nah ini toggle yang untuk merubah nilai dari undone ref
const btnDones = computed(() => {
    record.done = !record.done
    record.undone = false
})

// info jumlah total dari todo
const infoTotal = computed(() => todoControl.showByID().length)

// info jumlah todo yang belum selesai - warnanya hijau
const infoUndone = computed(() => todoControl.onlyShowUndoneTask().length)

// info jumlah todo yang udah selesai - warna nya merah
const infoDone = computed(() => todoControl.onlyShowDoneTask().length)

// tempat dimana pengolahan data todo. yang dikembalikan kedalam variable result
// mulanya (default) nilai result adalah todo.value itu sendiri.
// lalu si result di ubah berdasarkan option (select) element, bisa berdasarkan id, done, undone
// terakhir bisa ditampilkan juga berdasarkan done aja atau undone aja
// tapi element select akan berubah
const tempTodo = computed(() => {
    let result = todoControl.showTodo()

    switch(record.optionVal) { 
        case "id":
            result = todoControl.showByID();
            break;
        case "done":
            result = todoControl.showByDoneTask(); 
            break;
        case "not":
            result = todoControl.showByUndoneTask(); 
            break;
        default: 
            result = todoControl.showByID().reverse();
            break;
    }

    if (record.undone) {
        result = todoControl.onlyShowUndoneTask()
    }
    
    if (record.done) {
        result = todoControl.onlyShowDoneTask()
    }

    return result;
    
})

</script>

<template>
  <form @submit.prevent="btnNew">
      <h2>
          <button type="button" :disabled="true">< undo</button>
          <p>Todo App</p>
          <button type="button" :disabled="true">redo ></button>
      </h2>
      <p class="btn-total">{{ infoTotal }}</p>
      <button :class="['btn-not', record.undone && 'border-on']" type="button" @click="btnUndone">{{ infoUndone }}</button>
      <button :class="['btn-done', done && 'border-on']" type="button" @click="btnDones">{{ infoDone }}</button>
      <select name="filter" id="filter" class="filter" v-model="record.optionVal">
          <option value="">-- filter --</option>
          <option value="id">List by an ID</option>
          <option v-if="!record.undone && !done" value="done">List by done task</option>
          <option v-if="!record.undone && !done"value="not">List by not done task</option>
        </select>
    <ul :class="['todo-list', record.isScroll === true ? 'scrolling' : 'notscrolling']">
        <li v-for="(item, key) in tempTodo.filter((i, j) => record.isDropdown === false && record.isScroll === false ? j < 5 : j >= 0 )" :key>
            <TodoPopup :item
            :void-done="() => btnDone(item.getID())" 
            :void-update="() => btnUpdate(item.getID())" 
            :void-delete="() => btnDelete(item.getID())"/>
            
            <button type="button" :class="[item.isDone() ? 'done' : '']" @click="btnControl(item.getID())">{{ item.getTask() }}</button>
        </li>
    </ul>
    
    <button type="button" :class="['dropdown', record.isDropdown && 'border-on']" @click="btnDropDown">dropdown</button>

    <button type="button" :class="['scroll', record.isScroll && 'border-on']" @click="btnScroll">scroll</button>

    <label for="new-todo" class="new-todo">
        <input type="text" id="new-todo" placeholder="Add new task" v-model="record.input">
    </label>
    <button v-show="!record.memoUpdate" class="btn-new" type="button">new</button>
    <button v-show="record.memoUpdate" class="btn-update" type="button">update</button>
  </form>
</template>

<style scoped>

    form {
        background-color: #fff;
        width: 90%;
        margin: auto;
        padding: 10px;
        border-radius: 10px;
        display: grid;
        grid-template-areas: 
        'hea hea hea hea hea hea'
        'tot tot not not don don'
        'fil fil fil fil fil fil'
        'lis lis lis lis lis lis'
        'ddd ddd ddd flo flo flo'
        'inp inp inp inp new new';
        row-gap: 10px;
        column-gap: 5px;
        grid-template-columns: repeat(6, 1fr);
    }

    h2 {
        grid-area: hea;
        text-align: center;
        font-size: 1.2rem;
        font-weight: bold;
        background-color: lightsalmon;
        border-radius: 5px;
        color: white;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 5px 10px;
    }

    h2 button {
        border: 0;
        background-color: transparent;
        font-weight: bold;
    }

    .btn-total {
        grid-area: tot;

        border: 0;
        height: 50px;
        background-color: lightblue;
        color: rgb(121, 121, 192);
        font-size: 1.2rem;
        font-weight: bold;
        border-radius: 5px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-family: 'Courier New', Courier, monospace;
    }

    .btn-done {
        grid-area: don;

        border-width: 0px;
        border-style: solid;
        border-color: red;
        height: 50px;
        background-color: rgba(255, 120, 120, 0.5);
        color: rgb(184, 105, 105);
        font-size: 1.2rem;
        font-weight: bold;
        border-radius: 5px;
    }

    .btn-not {
        grid-area: not;

        border-width: 0px;
        border-style: solid;
        border-color: green;
        height: 50px;
        background-color: lightgreen;
        color: rgb(72, 168, 72);
        font-size: 1.2rem;
        font-weight: bold;
        border-radius: 5px;
    }

    .todo-list {
        grid-area: lis;
        display: flex;
        flex-direction: column;
        gap: 10px;
        padding: 0px 5px;
    }

    .todo-list.scrolling {
        height: 220px;
        overflow-y: auto;
    }

    .todo-list li {
        position: relative;
    }

    .todo-list li button {
        text-align: left;
        padding: 10px 5px;
        height: 100%;
        width: 100%;

        border-style: solid;
        border-width: 0px 5px 0px 5px;
        border-color: lightgreen;

        background-color: rgba(144, 238, 144, 0.5);
    }
    
    .todo-list li button.done {
        background-color: rgba(255, 120, 120, 0.5) !important;
        border-color: lightcoral !important;
    }

    .dropdown {
        grid-area: ddd;
        border-width: 0px;
        border-style: solid;
        border-color: green;
        height: 30px;
        border-radius: 5px;
        background-color: lightgreen;
        color: rgb(0, 102, 0);
    }

    
    .filter {
        grid-area: fil;
        border: 1px solid black;
        text-align: center;
        padding: 5px 0px;
        border-radius: 5px;
        background-color: white;
    }
    
    .scroll {
        grid-area: flo;
        border-width: 0px;
        border-style: solid;
        border-color: darkblue;
        height: 30px;
        border-radius: 5px;
        background-color: lightblue;
        color: darkblue;
    }

    .border-on {
        border-width: 1px;
    }
 
    .new-todo {
        grid-area: inp;
    }

    .new-todo input {
        padding: 5px 0px;
        border: 1px solid rgba(0, 0, 0, 0.418);
        border-radius: 5px;
        text-indent: 10px;
        outline: 0;
    }

    .btn-new {
        grid-area: new;
        border: 1px solid rgb(189, 189, 0);
        background-color: rgb(255, 255, 112);
        border-radius: 5px;
        color: rgb(58, 58, 0);
    }

    .btn-update {
        grid-area: new;
        border: 1px solid blue;
        background-color: lightblue;
        border-radius: 5px;
        color: blue;
    }

    button {
        cursor: pointer;
    }

</style>