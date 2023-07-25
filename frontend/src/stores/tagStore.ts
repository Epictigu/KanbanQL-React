import {defineStore} from "pinia";
import type {Tag} from "@/model/tag";
import TagService from "@/services/tagService";
import {useTicketStore} from "@/stores/ticketStore";

export const useTagStore = defineStore('tagStore', {
    state: () => ({
        tags: [] as Array<Tag>
    }),
    getters: {},
    actions: {
        initialize(): void {
            TagService.fetchAllTags()
                .then(response => {
                    this.tags = response.data.data.getAllTags;
                    this.fillInRandomColors();
                    useTicketStore().initialize();
                })
        },
        fillInRandomColors(): void {
            this.tags.forEach(tag => tag.color = this.generateRandomColor());
        },
        generateRandomColor(): string {
            let hexColorString = (Math.random() * 0xfffff * 1000000).toString(16);
            return '#' + hexColorString.slice(0, 6);
        }
    }
});