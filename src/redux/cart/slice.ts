import {createSlice} from '@reduxjs/toolkit'
import type {PayloadAction} from '@reduxjs/toolkit'
import {getCartFromLS} from "../../utils/getCartFromLS";
import {calcTotalPrice} from "../../utils/calcTotalPrice";
import {CartItemType, CartState} from "./types";


const cartData = getCartFromLS();
const { items, totalPrice } = cartData || { items: [], totalPrice: 0 };
const initialState: CartState = {
    totalPrice,
    items
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem(state, action: PayloadAction<CartItemType>) {
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
            if (findItem) findItem.count--;
            state.totalPrice = calcTotalPrice(state.items);
        },
    }
})


export const {
    addItem,
    removeItem,
    clearItems,
    minusItem
} = cartSlice.actions

export default cartSlice.reducer