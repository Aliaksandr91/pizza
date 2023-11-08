import {createSlice} from '@reduxjs/toolkit'
import type {PayloadAction} from '@reduxjs/toolkit'
import {SortObjType} from "../../pages/Home";
import {RootStateType} from "../store";

export type FilterState ={
    searchValue:string
    currentPage: number
    categoryIndex: number
    sort: SortObjType
}

const initialState: FilterState = {
    searchValue:'',
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
        setSearchValue(state, action) {
            state.searchValue = action.payload
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

export const selectSort = (state:RootStateType)=>state.filter.sort
export const selectFilter = (state:RootStateType)=>state.filter
export const {
    setCategoryIndex,
    setSearchValue,
    setSort,
    setCurrentPage,
    setFilters
} = filterSlice.actions

export default filterSlice.reducer