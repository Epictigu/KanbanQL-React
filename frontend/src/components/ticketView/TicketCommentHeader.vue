<template>
    <div class="comment-header">
        <span class="creation-label">Erstellt am</span>
        <span class="creation-value">{{ formattedDate }}</span>
    </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";

export default defineComponent({
    name: "TicketCommentHeader",
    props: {
        creationDate: {
            type: Date,
            default: new Date(2020, 2, 14, 16, 19, 1)
        }
    },
    computed: {
        formattedDate(): string {
            let options = {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
            } as Intl.DateTimeFormatOptions;

            return this.creationDate.toLocaleDateString("de-DE", options);
        }
    }
});
</script>

<style scoped lang="less">
.comment-header {
  padding: 20px;
  width: 100%;
  height: 80px;
  background-color: white;
  border-bottom: 1px solid var(--navigation-border-color);
  display: flex;
  flex-direction: column;
  justify-content: center;

  .creation-label {
    font-weight: 400;
    font-size: 0.7em;
    color: var(--basic-light-text-color);
  }

  .creation-value {
    font-size: 0.9em;
  }
}
</style>