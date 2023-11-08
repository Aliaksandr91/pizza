import {createSlice} from '@reduxjs/toolkit'
import type {PayloadAction} from '@reduxjs/toolkit'
import {stat} from "fs";

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
    totalPrice: number;
    items: ItemType[];
}

const initialState: CartState = {
    totalPrice: 0,
    items: []
}
export const calcTotalPrice = (items: ItemType[]) => {
    return items.reduce((sum, obj) => obj.price * obj.count + sum, 0);
};
export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem(state, action: PayloadAction<ItemType>) {
            const findItem = state.items.find((obj) => obj.id === action.payload.id);

            if (findItem) {
                findItem.count++;
            } else {
                state.items.push({
                    ...action.payload,
                    count: 1,
                });
            }

            state.totalPrice = calcTotalPrice(state.items);
        },
        removeItem(state, action: PayloadAction<string>) {
            state.items = state.items.filter((obj) => obj.id !== action.payload);
            state.totalPrice = calcTotalPrice(state.items);
        },
        clearItems(state) {
            state.items = []
            state.totalPrice = 0
        },
        minusItem(state, action: PayloadAction<string>) {
            const findItem = state.items.find((obj) => obj.id === action.payload);

            if (findItem) {
                findItem.count--;
            }

            state.totalPrice = calcTotalPrice(state.items);
        },
    }
})

// Action creators are generated for each case reducer function
export const {
    addItem,
    removeItem,
    clearItems,
    minusItem
} = cartSlice.actions

export default cartSlice.reducer