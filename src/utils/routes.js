import ProjectList from "@/pages/ProjectList.vue";

import Calculator from "@/pages/easy/Calculator.vue";
import ExpenseTracker from "@/pages/easy/ExpenseTracker.vue";
import Todo from "@/pages/easy/Todo.vue";
import Home from "@/pages/Home.vue";

export const easyCode = [
    {href: "calculator",      name: "Calculator",      component: Calculator,     createdAt: new Date(2025, 7, 17), isDone: new Date(2025, 7, 18)},
    {href: "todo",            name: "Todo App",        component: Todo,           createdAt: new Date(2025, 7, 17), isDone: new Date(2025, 7, 18)},
    {href: "expense_tracker", name: "Expense Tracker", component: ExpenseTracker, createdAt: new Date(2025, 7, 18), isDone: new Date(2025, 7, 19)},
]

export const mediumCode = [

]

export const hardCode = [

]

export const expertCode = [

]

export const codes = () => {
    const result = [];

    if (easyCode.length !== 0) {
        
        result.push(...easyCode.map(item => {
            return {...item, level: "easy"}
        }))
    }
    if (mediumCode.length !== 0) result.push(...mediumCode.map(item => {
            return {...item, level: "medium"}
        }))
    if (hardCode.length !== 0) result.push(...hardCode.map(item => {
            return {...item, level: "hard"}
        }))
    if (expertCode.length !== 0) result.push(...expertCode.map(item => {
            return {...item, level: "expert"}
        }))

    return result.sort((a, b) => a.createdAt - b.createdAt)
}

export const routes = () => {
    const initialroute = {
        "/": Home,
        "/easy": ProjectList,
        "/medium": ProjectList,
        "/hard": ProjectList,
        "/expert": ProjectList,
    }

    const codeList = codes()

    for (let code of codeList) {
        const path = `/${code.level}/${code.href}`
        if (!initialroute[path]) {
            initialroute[path] = code.component
        }
    }

    return initialroute
}
