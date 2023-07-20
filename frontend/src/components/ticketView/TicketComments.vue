<template>
    <div class="comments-container" v-if="comments">
        <span class="no-comments-info" v-if="comments.length == 0">Noch keine Kommentare eingetragen!</span>
    </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";

export default defineComponent({
    name: "TicketComments",
    props: {
        comments: {
            type: Array<string>,
            default: []
        }
    }
});
</script>

<style scoped lang="less">
.comments-container {
  display: flex;
  flex-grow: 1;

  .no-comments-info {
    color: var(--basic-light-text-color);
    margin: auto;
  }
}
</style>