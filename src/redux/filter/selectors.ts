import {RootStateType} from "../store";

export const selectSort = (state: RootStateType) => state.filter.sort
export const selectFilter = (state: RootStateType) => state.filter
