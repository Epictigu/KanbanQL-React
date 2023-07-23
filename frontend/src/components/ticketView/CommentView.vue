<template>
    <div class="comment-container">
        <span class="comment-date">{{ formattedDate }}</span>
        <span class="comment-text">{{ comment.name }}</span>
    </div>
</template>

<script lang="ts">
import {defineComponent, type PropType} from "vue";
import type {Comment} from "@/model/comment";

export default defineComponent({
    name: "CommentView",
    props: {
        comment: {
            type: Object as PropType<Comment>,
            required: true
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

            return this.comment.creationDate.toLocaleDateString("de-DE", options);
        }
    }
});
</script>

<style scoped lang="less">
.comment-container {
  display: flex;
  flex-direction: column;

  .comment-date {
    margin: 10px 25px 0 25px;
    font-weight: 300;
    font-size: 0.8em;
  }

  .comment-text {
    background-color: var(--navigation-background-color);
    width: calc(100% - 50px);
    border: 1px solid var(--navigation-border-color);
    border-radius: 10px;
    margin: 0 20px 0 20px;
    padding: 5px;
  }
}
</style>