import {configureStore} from '@reduxjs/toolkit'
import filter from './slices/filterSlice'
import cart from './slices/cartSlice'
import pizza from './slices/pizzaSlice'
import {useDispatch} from "react-redux";

export const store = configureStore({
    reducer: {
        filter,
        cart,
        pizza
    },
})

export type RootStateType = ReturnType<typeof store.getState>

type AppDispatchType = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatchType>()