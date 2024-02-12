import {configureStore} from "@reduxjs/toolkit";
import ticketsReducer from './ticketsSlice'
import tagsReducer from './tagsSlice.ts'

export const store = configureStore({
    reducer: {
        tickets: ticketsReducer,
        tags: tagsReducer
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;