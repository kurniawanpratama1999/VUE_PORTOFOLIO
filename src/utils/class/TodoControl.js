import { TodoModel } from "@/utils/class/TodoModel.js";
import { reactive, ref } from "vue";

export class TodoControl {
    todos = reactive([]);

    add({id, task}) {
        this.todos.push(new TodoModel({id, task}))
    }

    update({id, task, isDone, isShow}) {
        const todo = this.todos.find(todo => todo.getID() === id);
        if (!todo) return false;
        
        if (task !== undefined) todo.setTask({task});
        if (isDone !== undefined) todo.setDone({isDone})
        if (isShow !== undefined) todo.setShow({isShow})
        
        return true
    }
    
    delete({id}){
        this.todos = this.todos.filter((todo) => todo.getID() !== id)
    }

    getData({id}){
        return this.todos.find(todo => todo.getID() === id);
    }

    showTodo(){
        return [...this.todos];
    }

    showByID(){
        return this.showTodo().sort((a, b) => b.getID() - a.getID())
    }

    showByDoneTask(){
        return this.showTodo().sort((a, b) => a.isDone() - b.isDone())
    }

    showByUndoneTask(){
        return this.showTodo().sort((a, b) => b.isDone() - a.isDone())
    }

    onlyShowDoneTask(){
        return this.showTodo().filter((todo) => todo.isDone() === true)
    }

    onlyShowUndoneTask(){
        return this.showTodo().filter((todo) => todo.isDone() === false)
    }
}