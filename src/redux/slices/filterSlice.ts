import {createSlice} from '@reduxjs/toolkit'
import type {PayloadAction} from '@reduxjs/toolkit'
import {SortObjType} from "../../pages/Home";

export interface CounterState {
    currentPage: number
    categoryIndex: number
    sort: SortObjType
}

const initialState: CounterState = {
    currentPage: 1,
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
        setCurrentPage(state, action) {
            state.currentPage = action.payload
        },
        setFilters(state, action) {
            state.currentPage = Number(action.payload.currentPage)
            state.sort = action.payload.sort
            state.categoryIndex = Number(action.payload.categoryIndex)
        },

    },
})

// Action creators are generated for each case reducer function
export const {
    setCategoryIndex,
    setSort,
    setCurrentPage,
    setFilters
} = filterSlice.actions

export default filterSlice.reducer