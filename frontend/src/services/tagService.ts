import type {AxiosResponse} from "axios";
import axios from "axios";
import {useTagStore} from "@/stores/tagStore";

const API_URL = 'http://localhost:8080/graphql';

class TagService {

    async fetchAllTags(): Promise<AxiosResponse> {
        const data = {
            query: `
            query {
                getAllTags {
                    id,
                    tagName
                }
            }`
        }
        return await axios.post(API_URL, data);
    }

    createNewTag(title: string): void {
        const data = {
            query: `
            mutation createTag($title: String!) {
                createTag (tag: {tagName: $title}) {
                    id
                }
            }`,
            variables: {
                title
            }
        }
        axios.post(API_URL, data)
            .then((response) => useTagStore().initialize(),
                (error) => console.log(error));
    }

    deleteTag(id: string): void {
        const data = {
            query: `
            mutation deleteTag($id: String!) {
                deleteTag (id: $id) {
                    id
                }
            }`,
            variables: {
                id
            }
        }
        axios.post(API_URL, data)
            .then((response) => {
                    useTagStore().initialize();
                },
                (error) => console.log(error));
    }
}

export default new TagService();