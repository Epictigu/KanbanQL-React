<template>
    <div class="tag-view-container" v-if="tag.id" :style="tagColorStyle">
        <span class="tag-view-text">{{ tag.name }}</span>
    </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import {useTagStore} from "@/stores/tagStore";
import type {Tag} from "@/model/tag";

export default defineComponent({
    name: "TagView",
    props: {
        tagId: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            tag: {} as Tag
        }
    },
    computed: {
        tagColorStyle() {
            return "background: " + this.tag.color;
        }
    },
    setup() {
        const tagStore = useTagStore();

        return {tagStore};
    },
    mounted() {
        let foundTag = this.tagStore.tags.filter((tag) => tag.id === this.tagId).pop();
        if (foundTag) {
            this.tag = foundTag;
        }
    }
});
</script>

<style scoped lang="less">
.tag-view-container {
  margin: auto 5px auto 0;
  padding: 2px 12px;
  font-size: 0.7em;
  font-weight: lighter;
  border-radius: 2px 10px 10px 2px;

  .tag-view-text {
    color: white;
  }
}
</style>