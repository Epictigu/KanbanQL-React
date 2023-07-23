<template>
    <div class="comments-container" v-if="ticket.comments">
        <span class="no-comments-info" v-if="ticket.comments.length == 0">Noch keine Kommentare eingetragen!</span>
        <div class="comments-list" v-else>
            <CommentView v-for="comment in ticket.comments" :comment="comment"/>
        </div>
        <div class="add-comment-container">
            <input type="text" class="add-comment-input" v-model="commentText" placeholder="Neuer Kommentar ..." @keyup.enter="addComment"/>
            <i class="fa-solid fa-paper-plane add-comment-icon" role="button" @click="addComment"/>
        </div>
    </div>
</template>

<script lang="ts">
import {defineComponent, type PropType} from "vue";
import type {TicketDetails} from "@/model/ticketDetails";
import CommentView from "@/components/ticketView/CommentView.vue";

export default defineComponent({
    name: "TicketComments",
    components: {CommentView},
    props: {
        ticket: {
            type: Object as PropType<TicketDetails>,
            required: true
        }
    },
    data() {
        return {
            commentText: ""
        }
    },
    methods: {
        addComment() {
            this.commentText = "";
        }
    }
});
</script>

<style scoped lang="less">
.comments-container {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  max-height: 100%;
  border-radius: 20px;

  .no-comments-info {
    color: var(--basic-light-text-color);
    text-align: center;
    margin: auto;
  }

  .comments-list {
    position: relative;
    height: 1px;
    flex-grow: 1;

    margin-bottom: auto;
    overflow-y: auto;
    display: flex;
    flex-direction: column;

    .comment-container:last-child {
      margin-bottom: 20px;
    }
  }

  .add-comment-container {
    position: relative;

    .add-comment-input {
      width: 100%;
      padding: 20px 70px 20px 20px;
      background: var(--navigation-background-color);
      border-top: 1px solid var(--navigation-border-color);
      outline: none;
    }

    .add-comment-icon {
      position: absolute;
      top: 0;
      right: 0;
      margin: 20px 30px;
      font-size: 1.5em;
      height: 100%;
      line-height: 100%;
      color: var(--basic-dark-text-color);
    }
  }
}
</style>