<script>
    import "../app.css";
    import {SvelteUIProvider} from "@svelteuidev/core";
</script>

<SvelteUIProvider>
    <slot />
</SvelteUIProvider>