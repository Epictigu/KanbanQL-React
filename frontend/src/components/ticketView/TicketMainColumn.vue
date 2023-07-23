<template>
    <div class="main-column-container">
        <TicketStatusBar :ticket="ticket" @CloseTicketView="closeTicketView"/>
        <div class="main-column">
            <input type="text" id="name-field" v-model="newTitle" class="ticket-name-input"/>
            <textarea type="text" id="name-field" v-model="newDescription" class="ticket-description-input"
                      placeholder="Geben Sie hier eine Beschreibung ein..."/>
        </div>
    </div>
</template>

<script lang="ts">
import {defineComponent, type PropType} from "vue";
import TicketStatusBar from "@/components/ticketView/TicketStatusBar.vue";
import type {TicketDetails} from "@/model/ticketDetails";

export default defineComponent({
    name: "TicketMainColumn",
    components: {TicketStatusBar},
    emits: ["CloseTicketView"],
    props: {
        ticket: {
            type: Object as PropType<TicketDetails>,
            required: true
        }
    },
    data() {
        return {
            newTitle: "",
            newDescription: ""
        }
    },
    mounted() {
        this.newTitle = this.ticket.title;
        this.newDescription = this.ticket.description;
    },
    methods: {
        closeTicketView() {
            this.$emit("CloseTicketView");
        }
    }
});
</script>

<style scoped lang="less">
.main-column-container {
    width: 60%;
    border-right: 1px solid var(--navigation-border-color);
    display: flex;
    flex-direction: column;

    .main-column {
        display: flex;
        flex-direction: column;
        padding: 30px;
        flex-grow: 1;

        .ticket-name-input {
            padding: 11px;
            width: 100%;
            border: none;
            outline: none;
            font-size: 1.5em;
            margin-bottom: 30px;

            &:hover, &:focus {
                padding: 10px;
                border: 1px dashed var(--navigation-border-color);
            }
        }

        .ticket-description-input {
            padding: 21px;
            width: 100%;
            flex-grow: 1;
            border: none;
            outline: none;
            margin-bottom: 30px;
            resize: none;

            &:hover, &:focus {
                padding: 20px;
                border: 1px dashed var(--navigation-border-color);
            }
        }
    }
}
</style>