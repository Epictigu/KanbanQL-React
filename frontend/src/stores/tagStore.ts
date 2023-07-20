import {defineStore} from "pinia";
import type {Tag} from "@/model/tag";

export const useTagStore = defineStore('tagStore', {
    state: () => ({
        tags: [] as Array<Tag>
    }),
    getters: {},
    actions: {
        initialize(): void {
            this.tags.push({
                id: "1",
                name: "Backend",
                color: "#eb4034"
            });

            this.tags.push({
                id: "2",
                name: "Frontend",
                color: "#3489eb"
            });
        }
    }
});