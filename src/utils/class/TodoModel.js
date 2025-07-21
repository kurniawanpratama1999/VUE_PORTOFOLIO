import { reactive } from "vue";

export class TodoModel {
    constructor({id, task}){
        this.state = reactive({
            id:id,
            task:task,
            done: false,
            show: false
        })
    }

    getID () {
        return this.state.id;
    }

    getTask(){
        return this.state.task;
    }

    isDone(){
        return this.state.done
    }

    isShow(){
        return this.state.show
    }

    setTask({task}){
        this.state.task = task
    }

    setDone({isDone}){
        this.state.done = isDone
    }

    setShow({isShow}) {
        this.state.show = isShow
    }
}