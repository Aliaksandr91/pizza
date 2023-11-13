import { createSlice, PayloadAction} from "@reduxjs/toolkit";
import {CartState, PizzaType, Status} from "./types";
import {fetchPizzas} from "./asyncActions";

const initialState: CartState = {
    items: [],
    status: Status.LOADING
}

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
export const {
    setItems
} = pizzaSlice.actions

export default pizzaSlice.reducer