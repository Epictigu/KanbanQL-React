<template>
    <div class="ticket-view-bar d-flex">
        <i class="fa-solid fa-x ticket-view-close-button" role="button"/>
    </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";

export default defineComponent({
    name: "TicketViewHeader",
});
</script>

<style scoped lang="less">
.ticket-view-bar {
  background-color: var(--main-view-navigation-background-color);
  border-bottom: 1px solid var(--navigation-border-color);
  border-radius: 20px 20px 0 0;
  width: 100%;
  padding: 10px;

  .ticket-view-close-button {
    margin-left: auto;
    background-color: white;
    color: var(--basic-dark-text-color);
    padding: 10px;
    border: 1px solid var(--navigation-border-color);
    border-radius: 8px;
  }
}
</style>