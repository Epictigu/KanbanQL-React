<template>
    <NavigationBar/>
    <TicketBoard/>
    <TicketView/>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import TicketBoard from "@/components/TicketBoard.vue";
import NavigationBar from "@/components/NavigationBar.vue";
import TicketView from "@/components/ticketView/TicketView.vue";

export default defineComponent({
    name: "Home",
    components: {
        TicketView,
        NavigationBar,
        TicketBoard
    },
});
</script>