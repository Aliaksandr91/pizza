import {createSlice} from '@reduxjs/toolkit'
import type {PayloadAction} from '@reduxjs/toolkit'
import {SortObjType} from "../../pages/Home";

export interface CounterState {
    categoryIndex: number,
    sort: SortObjType
}

const initialState: CounterState = {
    categoryIndex: 0,
    sort: {name: 'популярности', sortProperty: 'rating'}
}

export const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        setCategoryIndex(state, action:PayloadAction<number>) {
            state.categoryIndex = action.payload
        },
        setSort(state, action) {
            state.sort = action.payload
        },

    },
})

// Action creators are generated for each case reducer function
export const {setCategoryIndex, setSort} = filterSlice.actions

export default filterSlice.reducer