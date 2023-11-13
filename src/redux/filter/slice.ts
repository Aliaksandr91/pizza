import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {FilterStateType, SortType} from "./types";

const initialState: FilterStateType = {
    searchValue: '',
    currentPage: 1,
    categoryIndex: 0,
    sort: {name: 'популярности (DESC)', sortProperty: 'rating'}
}

export const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        setCategoryIndex(state, action: PayloadAction<number>) {
            state.categoryIndex = action.payload
        },
        setSearchValue(state, action: PayloadAction<string>) {
            state.searchValue = action.payload
        },
        setSort(state, action: PayloadAction<SortType>) {
            state.sort = action.payload
        },
        setCurrentPage(state, action: PayloadAction<number>) {
            state.currentPage = action.payload
        },
        setFilters(state, action: PayloadAction<FilterStateType>) {
            state.currentPage = Number(action.payload.currentPage)
            state.sort = action.payload.sort ?? initialState.sort
            state.categoryIndex = Number(action.payload.categoryIndex)
        },

    },
})
export const {
    setCategoryIndex,
    setSearchValue,
    setSort,
    setCurrentPage,
    setFilters
} = filterSlice.actions

export default filterSlice.reducer