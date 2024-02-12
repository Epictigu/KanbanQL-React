import {ApolloClient, ApolloQueryResult, gql, InMemoryCache, NormalizedCacheObject} from "@apollo/client";

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
                        tagName
                    }
                }`
        });
    }

    createNewTag(title: string): void {
        this.client.mutate({
            mutation: gql`
                mutation createTag($title: String!) {
                    createTag (tag: {tagName: $title}) {
                        id
                    }
                }`,
            variables: {
                title
            }
        }).then((response) => console.log(response),
            (error) => console.log(error));
    }

    deleteTag(id: string): void {
        this.client.mutate({
            mutation: gql`
                mutation deleteTag($id: String!) {
                    deleteTag (id: $id) {
                        id
                    }
                }`,
            variables: {
                id
            }
        }).then((response) => console.log(response),
            (error) => console.log(error));
    }
}

export default new TagService();