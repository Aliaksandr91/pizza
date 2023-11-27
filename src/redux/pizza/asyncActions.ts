import {createAsyncThunk} from "@reduxjs/toolkit";
import {PizzaType, SearchParamsType} from "./types";
import axios from "axios";

export const fetchPizzas = createAsyncThunk<PizzaType[], SearchParamsType>(
    'pizza/fetchPizzasStatus',
    async (params) => {
        const {order, sortBy, category, search, currentPage} = params
        const {data} = await axios.get<PizzaType[]>(`https://6540fd8045bedb25bfc3032e.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`)
        return data
    }
)