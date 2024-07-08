<script lang="ts">
    import Tasks, {deleteTask, updateTask} from "$lib/stories/tasks";
    import type {ITask} from "$lib/interfaces/ITask";
    import {ActionIcon, Button, Checkbox, Flex, Input, Space, Textarea} from "@svelteuidev/core";
    import {Copy, PencilIcon, TextIcon, Trash} from "lucide-svelte";

    export let status = "Активные"

    let tasks: ITask[] = [];
    let unsubscribe = Tasks.subscribe(value => {
        tasks = value;
    })
    let editableTask = 0

    function onCheckedChange(id: number) {
        let currentTask = tasks.find(task => task.id === id)
        currentTask!.status = currentTask!.status === "Завершенные" ? "Активные" : "Завершенные"
        updateTask(currentTask!)
    }

    function handleDelete(id: number) {
        let task = tasks.find(task => task.id === id)
        task!.status = "Удаленные"
        updateTask(task!)
    }

    function handleCopy(id: number) {
        let currentDescription = tasks.find(task => task.id === id)!.description
        return navigator.clipboard.writeText(currentDescription)
    }

</script>

<div>
    {#each tasks as task}
        {#if task.status === status || status === "Все"}
            <Flex direction="column" class="border rounded border-gray-200 px-3 py-2 mb-2">
                <Flex justify="space-between">
                    {#if task.status !== "Удаленные"}
                        <Checkbox checked={task.status === "Завершенные"} on:change={() => onCheckedChange(task.id)}/>
                        <p class="font-medium text-xl">{task.name}</p>
                        <Flex gap="xs">
                            <ActionIcon on:click={() => editableTask = task.id} size="md" variant="light"
                                        class="text-gray-500 bg-gray-100 hover:bg-gray-200">
                                <PencilIcon color="gray" size="16"/>
                            </ActionIcon>
                            <ActionIcon on:click={() => handleDelete(task.id)} size="md" variant="light"
                                        class="text-gray-500 bg-red-100 hover:bg-red-200">
                                <Trash color="red" size="16"/>
                            </ActionIcon>
                        </Flex>
                    {:else}
                        <p class="text-red-500">Задача удалена</p>
                    {/if}
                </Flex>

                {#if editableTask === task.id}
                    <Flex justify="space-between" gap="xs" class="pt-2">
                        <Textarea class="w-full" bind:value={task.description}/>
                        <Button on:click={() => editableTask = 0}>Сохранить</Button>
                    </Flex>
                {/if}

                <Flex class="rounded bg-gray-100 border border-gray-300 p-1 my-2 justify-between">
                    <TextIcon size="20" class="text-gray-400"/>
                    <p contenteditable={editableTask == task.id} class="p-2 text-gray-600 mr-auto">
                        {task.description}
                    </p>
                    <ActionIcon on:click={() => handleCopy(task.id)} size="md" variant="light"
                                class="text-gray-500 bg-gray-100 hover:bg-gray-200">
                        <Copy color="gray" size="16"/>
                    </ActionIcon>
                </Flex>
                {#if task.createdAt === task.updatedAt}
                    <p class="text-gray-500">Создано: {task.createdAt.toLocaleTimeString('ru-RU')}</p>
                {:else}
                    <p class="text-gray-500">Создано: {task.createdAt.toLocaleTimeString('ru-RU')} |
                        Обновлено: {task.updatedAt.toLocaleTimeString('ru-RU')}</p>
                {/if}
            </Flex>
        {/if}
    {/each}
</div>