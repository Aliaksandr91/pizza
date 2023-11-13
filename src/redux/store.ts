import {configureStore} from '@reduxjs/toolkit'
import filter from './filter/slice'
import cart from './cart/slice'
import pizza from './pizza/slice'
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