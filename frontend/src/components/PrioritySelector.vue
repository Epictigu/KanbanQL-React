<template>
    <div class="priority-selector">
        <v-tooltip top :text=priorityTitle location="top">
            <template v-slot:activator="{ props }">
                <i class="fa-solid fa-flag selector-icon"
                   :style="priorityStyle"
                   @click="toggleSelector"
                   v-bind="props"
                   role="button"/>
            </template>
        </v-tooltip>
        <div class="priority-selector-overlay" v-if="shouldShowSelector">
            <div class="priority-selector-line"
                 v-for="priority in selectablePriorities"
                 @click="selectPriority(priority)"
                 role="button"
            >
                <i class="fa-solid fa-flag selector-icon" :style="getColorStyleForPriority(priority)"/>
                <span class="ml-1">{{ getTitleForPriority(priority) }}</span>
                <i class="fa-solid fa-check ml-auto" v-if="priority == currentPriority"/>
            </div>
        </div>
        <BackgroundBlocker v-if="shouldShowSelector" @click="toggleSelector"/>
    </div>
</template>

<script lang="ts">

import type {PropType} from "vue";
import {defineComponent} from "vue";
import {Priority} from "@/enum/priority";
import BackgroundBlocker from "@/components/utils/BackgroundBlocker.vue";

export default defineComponent({
    name: "PrioritySelector",
    components: {BackgroundBlocker},
    props: {
        currentPriority: {
            type: Number as PropType<Priority>,
            required: true
        }
    },
    emits: ["selectPriority"],
    data() {
        return {
            shouldShowSelector: false,
            selectablePriorities: [
                Priority.CRITICAL,
                Priority.HIGH,
                Priority.MEDIUM,
                Priority.LOW,
            ],
        }
    },
    computed: {
        Priority() {
            return Priority
        },
        priorityStyle() {
            return this.getColorStyleForPriority(this.currentPriority);
        },
        priorityTitle() {
            return this.getTitleForPriority(this.currentPriority);
        }
    },
    methods: {
        getColorStyleForPriority(priority: Priority) {
            let colorStylePrefix = "color: ";
            switch (priority) {
                case Priority.LOW:
                    return colorStylePrefix + "lightgray";
                case Priority.MEDIUM:
                    return colorStylePrefix + "#41b8df"
                case Priority.HIGH:
                    return colorStylePrefix + "orange";
                case Priority.CRITICAL:
                    return colorStylePrefix + "red";
                default:
                    return colorStylePrefix + "black";
            }
        },
        getTitleForPriority(priority: Priority) {
            switch (priority) {
                case Priority.LOW:
                    return "Niedrige Priorität";
                case Priority.MEDIUM:
                    return "Mittlere Priorität"
                case Priority.HIGH:
                    return "Hohe Priorität";
                case Priority.CRITICAL:
                    return "Kritische Priorität";
                default:
                    return "undefined";
            }
        },
        toggleSelector() {
            this.shouldShowSelector = !this.shouldShowSelector;
        },
        selectPriority(priority: Priority) {
            this.$emit("selectPriority", priority)
            this.shouldShowSelector = false;
        }
    }
});
</script>

<style scoped lang="less">
.priority-selector {
  margin: 5px auto 5px 0;
  position: relative;

  .priority-selector-overlay {
    position: absolute;
    left: 1em;
    background: white;
    border: 1px solid var(--navigation-border-color);
    border-radius: 4px;
    padding: 10px;
    z-index: 100;

    .priority-selector-line {
      display: flex;
      width: 200px;
      padding: 5px;
      border-radius: 4px;

      &:hover {
        background: var(--basic-hover-color);
      }

      .fa-solid {
        margin-top: auto;
        margin-bottom: auto;
        height: 100%;
      }
    }
  }
}
</style>