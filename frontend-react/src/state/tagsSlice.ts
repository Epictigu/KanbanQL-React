import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Tag} from "../model/tag.ts";
import TagService from "../services/tagService.ts";
interface TagsState{
    tags: Tag[]
}

const fillInRandomColors = (tags: Tag[]) => {
    tags.forEach(tag => tag.color = generateRandomColor());
}
const generateRandomColor = () => {
    let hexColorString = (Math.random() * 0xfffff * 1000000).toString(16);
    return '#' + hexColorString.slice(0, 6);
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
        builder.addCase(initializeTagsAsync.fulfilled, (state, action: PayloadAction<Tag[]|null>) => {
            if(action.payload !== null){
                const tags: Tag[] = structuredClone(action.payload);
                fillInRandomColors(tags);
                state.tags = tags;
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
export const {} = tagsSlice.actions;
export default tagsSlice.reducer;