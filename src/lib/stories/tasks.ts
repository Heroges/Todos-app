import {type Writable, writable} from 'svelte/store';
import type {ITask} from "$lib/interfaces/ITask";

export function addTask(task: ITask) {
    tasks.update(tasks => [task, ...tasks]);
}

export function updateTask(task: ITask) {
    task!.updatedAt = new Date()
    tasks.update(tasks => tasks.map(t => t.id === task.id? task : t));
}

export function deleteTask(task: ITask) {
    tasks.update(tasks => tasks.filter(t => t.id !== task.id));
}

// function setLocalStorage() {
//     localStorage.setItem('tasks', JSON.stringify(tasks));
// }

let tasks: Writable<ITask[]>;
tasks = writable<ITask[]>([
    {
        id: 1,
        name: "Первый задача",
        description: "Описание первой задачи",
        status: "Активные",
        createdAt: new Date(),
        updatedAt: new Date(),
    }
]);

export default tasks