import {createSlice} from '@reduxjs/toolkit'
import type {PayloadAction} from '@reduxjs/toolkit'
import {stat} from "fs";

export type ItemType = {
    id: number
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

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem(state, action) {
            const findItem = state.items.find(obj => obj.id === action.payload.id)
            if (findItem) {
                findItem.count++
            } else {
                state.items.push({
                    ...action.payload,
                    count: 1
                })
            }
            state.totalPrice = state.items.reduce((sum, obj) => {
                return (obj.price * obj.count) + sum
            }, 0)
        },
        removeItem(state, action: PayloadAction<number>) {
            state.items = state.items.filter(obj => obj.id !== action.payload)
        },
        clearItems(state) {
            state.items = []
            state.totalPrice = 0
        },
        minusItem(state, action: PayloadAction<number>){
            const findItem = state.items.find(obj => obj.id === action.payload)
            if (findItem) findItem.count--
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