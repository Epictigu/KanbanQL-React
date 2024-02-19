import {ApolloClient, ApolloQueryResult, FetchResult, gql, InMemoryCache, NormalizedCacheObject} from "@apollo/client";
import {Tag} from "../model/tag.ts";

const API_URL = 'http://localhost:8080/graphql';

class TagService {

    client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
        uri: API_URL,
        cache: new InMemoryCache()
    });

    async fetchAllTags(): Promise<ApolloQueryResult<any>> {
        return await this.client.query({
            query: gql`
                query {
                    getAllTags {
                        id,
                        tagName,
                        color
                    }
                }`
        });
    }

    createNewTag(tag: Tag): Promise<FetchResult<any>> {
        return this.client.mutate({
            mutation: gql`
                mutation createTag($title: String!, $color: String!) {
                    createTag (tag: {tagName: $title, color: $color}) {
                        id,
                        tagName,
                        color
                    }
                }`,
            variables: {
                title: tag.tagName,
                color: tag.color
            }
        })
    }

    deleteTag(id: string): Promise<FetchResult<any>> {
        return this.client.mutate({
            mutation: gql`
                mutation deleteTag($id: String!) {
                    deleteTag (id: $id) {
                        id
                    }
                }`,
            variables: {
                id
            }
        });
    }
}

export default new TagService();