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

    },
})

// Action creators are generated for each case reducer function
export const {setCategoryIndex, setSort,setCurrentPage} = filterSlice.actions

export default filterSlice.reducer