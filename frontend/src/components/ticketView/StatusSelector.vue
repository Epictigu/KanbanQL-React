<template>
    <div class="status-selector-container">
        <div class="status-selector-main" :style="zIndexStyle" role="button" @click="toggleSelector">
            <span class="user-select-none">{{ currentStatus }}</span>
            <i class="fa-solid fa-caret-right ml-1" :style="selectorIconStyle"/>
        </div>
        <div class="status-selector-overlay" v-if="selectorOpened">
            <span class="status-selector-item" v-if="status != TicketStatus.BACKLOG" @click="setNewStatus(TicketStatus.BACKLOG)">Backlog</span>
            <span class="status-selector-item" v-if="status != TicketStatus.PLANNED" @click="setNewStatus(TicketStatus.PLANNED)">Geplant</span>
            <span class="status-selector-item" v-if="status != TicketStatus.IN_PROGRESS"
                  @click="setNewStatus(TicketStatus.IN_PROGRESS)">In Arbeit</span>
            <span class="status-selector-item" v-if="status != TicketStatus.TO_REVIEW" @click="setNewStatus(TicketStatus.TO_REVIEW)">Im Review</span>
            <span class="status-selector-item" v-if="status != TicketStatus.DONE" @click="setNewStatus(TicketStatus.DONE)">Abgeschlossen</span>
        </div>
        <BackgroundBlocker v-if="selectorOpened" @click="toggleSelector"/>
    </div>
</template>

<script lang="ts">
import type {PropType} from "vue";
import {defineComponent} from "vue";
import {TicketStatus} from "@/enum/ticketStatus";
import BackgroundBlocker from "@/components/utils/BackgroundBlocker.vue";

export default defineComponent({
    name: "StatusSelector",
    components: {BackgroundBlocker},
    emits: ["changeStatus"],
    props: {
        status: {
            type: Number as PropType<TicketStatus>
        }
    },
    data() {
        return {
            selectorOpened: false
        }
    },
    computed: {
        TicketStatus() {
            return TicketStatus;
        },
        currentStatus() {
            switch (this.status) {
                case TicketStatus.IN_PROGRESS:
                    return "In Bearbeitung";
                case TicketStatus.BACKLOG:
                    return "Backlog";
                case TicketStatus.PLANNED:
                    return "In Planung";
                case TicketStatus.TO_REVIEW:
                    return "Im Review";
                case TicketStatus.DONE:
                    return "Abgeschlossen";
                default:
                    return "Ungültiger Status";
            }
        },
        zIndexStyle() {
            return this.selectorOpened ? "z-index: 60" : "";
        },
        selectorIconStyle() {
            return this.selectorOpened ? "rotate: 90deg" : "";
        },
    },
    methods: {
        toggleSelector() {
            this.selectorOpened = !this.selectorOpened;
        },
        setNewStatus(status: TicketStatus) {
            this.$emit("changeStatus", status);
            this.selectorOpened = false;
        }
    }
});
</script>

<style scoped lang="less">
.status-selector-container {
  position: relative;
  display: flex;
  flex-direction: column;

  .status-selector-main {
    display: flex;
    align-items: center;
    justify-content: space-between;

    border-radius: 4px;
    padding: 5px 10px;
    min-width: 150px;
    background-color: var(--status-selector-background-color);
    color: var(--status-selector-text-color);
  }

  .status-selector-overlay {
    display: flex;
    flex-direction: column;
    position: absolute;
    top: calc(100% - 10px);
    width: 100%;
    padding: 15px 10px 5px 10px;
    user-select: none;
    z-index: 55;
    background-color: var(--main-background-color);
    border: 1px solid var(--status-selector-background-color);
    border-radius: 0 0 4px 4px;

    .status-selector-item {
      padding: 3px 5px;
      border-radius: 8px;

      &:hover {
        background-color: var(--status-selector-background-color);
        color: var(--status-selector-text-color);
        cursor: pointer;
      }
    }
  }
}
</style>