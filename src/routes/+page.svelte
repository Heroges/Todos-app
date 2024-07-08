<script lang="ts">
    import {Container, Input, Tabs, Group, Flex, ActionIcon, Checkbox} from '@svelteuidev/core';
    import Header from "../components/Header.svelte";
    import type { ITask } from "$lib/interfaces/ITask.js";
    import Tasks, {updateTask} from "$lib/stories/tasks";
    import TaskList from "../components/TaskList.svelte";

    let title = "Все"
    let tabs = ["Все", "Активные", "Завершенные", "Удаленные"]
    let active = 0

    let tasks: ITask[] = []

    let unsubscribe = Tasks.subscribe(value => {
        tasks = value;
    })

    function onActiveChange(event) {
        const { key } = event.detail;
        title = key;
    }

</script>

<Container size="xs" class="flex flex-col gap-2">
    <Header title={title} />
    <Tabs bind:active on:change={onActiveChange}>
        {#each tabs as tab}
            <Tabs.Tab label={tab} tabKey={tab}>
                <TaskList status={title} />
            </Tabs.Tab>
        {/each}
    </Tabs>
</Container>