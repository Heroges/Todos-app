<script lang="ts">
    import {Button, Flex, Group, Input, Modal, Textarea} from "@svelteuidev/core";
    import { addTask } from "$lib/stories/tasks"
    import type {ITask} from "$lib/interfaces/ITask";

    export let opened = false;

    let name = "";
    let description = "";
    let error = ""

    export function toggleModal() {
        opened = !opened;
    }

    function handleAddTask() {
        if(!(description.length >= 20)) return error = "Минимальная длина 20 символов";

        error = "";
        let task: ITask = {
            id: Date.now(),
            name: name,
            description: description,
            status: "Активные",
            createdAt: new Date(),
            updatedAt: new Date(),
        }

        addTask(task)

        name = "";
        description = "";
    }

</script>


<Modal {opened} on:close={toggleModal} title="Новая задачка">
    <Flex direction="column" gap="md">
        <Input bind:value={name} type="text" placeholder="Название" />
        <Textarea error={error} bind:value={description} description={"Длина: " + description.length + "/20"} placeholder="Описание" rows="4" />
        <Button size="sm" class="self-end" color="blue" on:click={handleAddTask}>Добавить</Button>
    </Flex>
</Modal>