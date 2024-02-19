import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Tag} from "../model/tag.ts";
import TagService from "../services/tagService.ts";

interface TagsState{
    tags: Tag[]
}

const initialState: TagsState = {
    tags: []
} as TagsState

const tagsSlice = createSlice({
    name: "tags",
    initialState: initialState,
    reducers: {

    },
    extraReducers: (builder) =>{
        builder
            .addCase(initializeTagsAsync.fulfilled, (state, action: PayloadAction<Tag[]|null>) => {
                if(action.payload !== null){
                    state.tags = structuredClone(action.payload);
                }
            })
            .addCase(deleteTagAsync.fulfilled, (state, action: PayloadAction<string|null>) => {
                if(action.payload !== null){
                    const index = state.tags.findIndex((tag) => tag.id === action.payload);
                    if(index !== -1){
                        state.tags.splice(index, 1);
                    }
                }
            })
            .addCase(createNewTagAsync.fulfilled, (state, action: PayloadAction<Tag|null>) => {
                if(action.payload !== null){
                    state.tags.push(structuredClone(action.payload));
                }
            })
    }
});

export const initializeTagsAsync = createAsyncThunk(
    "tags/initializeTagsAsync",
    async () =>
        await TagService.fetchAllTags().then((value) => {
            const tags: Tag[] = value.data.getAllTags;
            return tags;
        }, (error) => {
            console.log(error);
            return null;
        })
);

export const deleteTagAsync = createAsyncThunk(
    "tags/deleteTagAsync",
    async (id: string) =>
        await TagService.deleteTag(id).then((value) => {
            const id: string= value.data.deleteTag.id;
            return id;
        }, (error) => {
            console.log(error);
            return null;
        })
);

export const createNewTagAsync = createAsyncThunk(
    "tags/createNewTagAsync",
    async (tag: Tag) =>
        await TagService.createNewTag(tag).then((value) => {
            const tag: Tag = value.data.createTag;
            return tag;
        }, (error) => {
            console.log(error);
            return null;
        })
);
export const {} = tagsSlice.actions;
export default tagsSlice.reducer;