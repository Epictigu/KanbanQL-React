<template>
    <div class="navigation-bar">
        <i class="fa-solid fa-clipboard-list app-icon mr-2"></i>
        <span class="app-title">KanbanQL</span>
        <button class="btn btn-primary ticket-add-button">Ticket hinzufügen</button>
    </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";

export default defineComponent({
    name: "NavigationBar"
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