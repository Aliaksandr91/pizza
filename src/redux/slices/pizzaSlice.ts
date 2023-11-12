import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import type {PayloadAction} from '@reduxjs/toolkit'
import axios from "axios";
import {RootStateType} from "../store";

export type SearchParamsType ={
    order:string
    sortBy:string
    category:string
    search:string
    currentPage: number
}


export type PizzaType = {
    id: string;
    title: string;
    price: number;
    imageUrl: string;
    type: string;
    size: number;
    count: number;
};

export enum Status {
    LOADING = 'loading',
    SUCCESS = 'success',
    ERROR = 'error'
}

export type CartState = {
    items: PizzaType[];
    status: Status
}

const initialState: CartState = {
    items: [],
    status: Status.LOADING
}
export const fetchPizzas = createAsyncThunk<PizzaType[], SearchParamsType>(
    'pizza/fetchPizzasStatus',
    async (params) => {
        const {order, sortBy, category, search, currentPage} = params
        const {data} = await axios.get<PizzaType[]>(`https://6540fd8045bedb25bfc3032e.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`)
        return data
    }
)


const pizzaSlice = createSlice({
    name: 'pizza',
    initialState,
    reducers: {
        setItems(state, action: PayloadAction<PizzaType[]>) {
            state.items = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchPizzas.pending, (state) => {
                state.status = Status.LOADING
                state.items = [];
            })
            .addCase(fetchPizzas.fulfilled, (state, action) => {
                state.items = action.payload;
                state.status = Status.SUCCESS
            })
            .addCase(fetchPizzas.rejected, (state) => {
                state.status = Status.ERROR
                state.items = [];
            });
    },
});

export const selectPizzaData = (state: RootStateType) => state.pizza
export const {
    setItems
} = pizzaSlice.actions

export default pizzaSlice.reducer