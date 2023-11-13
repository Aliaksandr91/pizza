import {RootStateType} from "../store";

export const selectCart = (state: RootStateType) => state.cart
export const selectCartItemById = (id: string) => (state: RootStateType) => state.cart.items.find((obj) => obj.id === id)
