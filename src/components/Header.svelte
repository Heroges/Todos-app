<script lang="ts">
    import {Button, Flex, Title} from '@svelteuidev/core';
    import ModalCreate from "./ModalCreate.svelte";

    export let title = "Активные"
    let opened = false;
    function toggleModal() {
        opened = !opened;
    }
</script>

<svelte:head>
    <title>DaiApps | {title} задачи</title>
</svelte:head>

<div>
    <Flex class="my-2 select-none" justify="space-between">
        <Title>{title}</Title>
        <Button on:click={toggleModal}>Добавить</Button>
    </Flex>
    <ModalCreate bind:opened={opened} on:close={toggleModal} />
</div>

<style>

</style>