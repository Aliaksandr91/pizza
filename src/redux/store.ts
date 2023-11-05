import { configureStore } from '@reduxjs/toolkit'
import filter from './slices/filterSlice'
export const store = configureStore({
    reducer: {
        filter
    },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootStateType = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatchType = typeof store.dispatch