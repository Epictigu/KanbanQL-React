<template>
    <h2>Mainpage</h2>
    <TicketBoard/>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import TicketBoard from "@/components/TicketBoard.vue";

export default defineComponent({
    name: "Home",
    components: {
        TicketBoard
    },
});
</script>