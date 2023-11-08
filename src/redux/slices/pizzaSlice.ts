import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import type {PayloadAction} from '@reduxjs/toolkit'
import axios from "axios";
import {RootStateType} from "../store";

export type ItemType = {
    id: string;
    title: string;
    price: number;
    imageUrl: string;
    type: string;
    size: number;
    count: number;
};
export type CartState = {
    items: ItemType[];
    status: 'loading' | 'success' | 'error'
}

const initialState: CartState = {
    items: [],
    status: 'loading'
}
export const fetchPizzas = createAsyncThunk(
    'pizza/fetchPizzasStatus',
    async (params: { order: string, sortBy: string, category: string, search: string, currentPage: number }) => {
        const {order, sortBy, category, search, currentPage} = params
        const {data} = await axios.get(`https://6540fd8045bedb25bfc3032e.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`)
        return data
    }
)


const pizzaSlice = createSlice({
    name: 'pizza',
    initialState,
    reducers: {
        setItems(state, action) {
            state.items = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchPizzas.pending, (state) => {
                state.status = 'loading';
                state.items = [];
            })
            .addCase(fetchPizzas.fulfilled, (state, action) => {
                state.items = action.payload;
                state.status = 'success';
            })
            .addCase(fetchPizzas.rejected, (state) => {
                state.status = 'error';
                state.items = [];
            });
    },
});

export const selectPizzaData = (state: RootStateType) => state.pizza
export const {
    setItems
} = pizzaSlice.actions

export default pizzaSlice.reducer