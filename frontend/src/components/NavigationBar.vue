<template>
    <div class="navigation-bar">
        <i class="fa-solid fa-clipboard-list app-icon mr-2"></i>
        <span class="app-title">KanbanQL</span>
        <button class="btn btn-primary ticket-add-button" @click="openCreateTicketModal">Ticket hinzufügen</button>
        <button class="btn btn-primary ticket-add-button" @click="openEditTagsModal">Tags bearbeiten</button>
    </div>
    <Modal ref="addTicketModal" save-button-text="Hinzufügen" @modalSave="createTicket">
        <template v-slot:modal-title>
            Neues Ticket erstellen
        </template>
        <template v-slot:modal-body>
            <div class="input-group d-flex flex-column">
                <label for="newTicketName">Name des Tickets:</label>
                <input id="newTicketName" v-model="newTicketName" class="form-control w-100" type="text"/>
            </div>
        </template>
    </Modal>
    <Modal ref="editTagsModal" :save-button-show="false" cancel-button-text="Fertig">
        <template v-slot:modal-title>
            Tags bearbeiten
        </template>
        <template v-slot:modal-body>
            <div class="tag-line d-flex mb-2" v-for="tag in tags">
                <TagView :tag-id="tag.id"/>
                <i class="fa-solid fa-trash ml-auto text-center" role="button"/>
            </div>
        </template>
    </Modal>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import Modal from "@/components/utils/Modal.vue";
import TicketService from "@/services/ticketService";
import {useTagStore} from "@/stores/tagStore";
import TagView from "@/components/TagView.vue";

export default defineComponent({
    name: "NavigationBar",
    components: {TagView, Modal},
    data() {
        return {
            newTicketName: ""
        }
    },
    setup() {
        const tagStore = useTagStore();

        return {tagStore};
    },
    computed: {
        tags() {
            return this.tagStore.tags;
        }
    },
    methods: {
        openCreateTicketModal() {
            (this.$refs.addTicketModal as typeof Modal).displayModal();
        },
        openEditTagsModal() {
            (this.$refs.editTagsModal as typeof Modal).displayModal();
        },
        createTicket() {
            TicketService.createNewTicketWithName(this.newTicketName);
        }
    }
});
</script>

<style scoped lang="less">
.navigation-bar {
  display: flex;
  width: 100%;
  padding: 10px 20px;
  border-bottom: 1px solid var(--navigation-border-color);
  margin-bottom: 20px;
  background-color: var(--navigation-background-color);

  .app-title {
    text-align: center;
    margin-top: auto;
    margin-bottom: auto;
    font-size: 1.2em;
    padding: 4px 15px 4px 0;

    border-right: 1px solid var(--navigation-border-color);

    line-height: 100%;

    pointer-events: none;
    user-select: none;
  }

  .app-icon {
    text-align: center;
    margin-top: auto;
    margin-bottom: auto;
    font-size: 1.2em;
    border-radius: 10px;

    padding: 10px;
    background: var(--navigation-icon-background-color);

    pointer-events: none;
  }

  .ticket-add-button {
    font-size: 0.9em;
    padding: 5px;
    margin-left: 15px;
  }
}
</style>