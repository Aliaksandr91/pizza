import React, {useContext, useEffect, useState} from "react";
import {Categories} from "../components/Categories";
import {Sort} from "../components/Sort";
import {Skeleton} from "../components/PizzaBlock/Skeleton";
import {PizzaBlock} from "../components/PizzaBlock/PizzaBlock";
import {Pagination} from "../components/Pagination/Pagination";
import {SearchContext, SearchContextType} from "../App";
import {useSelector, useDispatch} from 'react-redux'
import {RootStateType} from "../redux/store";
import {setCategoryIndex, setCurrentPage} from "../redux/slices/filterSlice";
import axios from "axios";


type PizzaType = {
    "id": number
    "imageUrl": string
    "title": string
    "types": number[]
    "sizes": number[]
    "price": number
    "category": number
    "rating": number
}

export type SortObjType = {
    name: string
    sortProperty: string
}


export const Home = () => {
    const {categoryIndex, sort, currentPage} = useSelector((state: RootStateType) => state.filter)
    const sortType = sort.sortProperty
    const dispatch = useDispatch()

    const onChangeCategory = (index: number) => {
        dispatch(setCategoryIndex(index))
    }

    const onChangePage = (pageNumber:number) => {
        dispatch(setCurrentPage(pageNumber))
    }

    const context = useContext(SearchContext);
    if (context === undefined) {
        throw new Error("useSearch must be used within a SearchProvider");
    }
    const {searchValue} = context as SearchContextType;

    const [items, setItems] = useState([])
    const [isLoading, setIsLoading] = useState(true)


    useEffect(() => {
        setIsLoading(true)
        const order = sortType.includes('-') ? 'asc' : 'desc'
        const sortBy = sortType.replace('-', '')
        const category = categoryIndex > 0 ? `category=${categoryIndex}` : ''
        const search = searchValue ? `&search=${searchValue}` : ''

        axios.get(`https://6540fd8045bedb25bfc3032e.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`)
            .then(res => {
                setItems(res.data)
                setIsLoading(false)
            })
        window.scrollTo(0, 0)
    }, [categoryIndex, sortType, searchValue, currentPage])

    const pizzas = items
        .map((pizza: PizzaType) => <PizzaBlock key={pizza.id} {...pizza}/>)
    const skeletons = [...new Array(6)].map((_, index) => <Skeleton key={index}/>)
    return (
        <div className={'container'}>
            <div className="content__top">
                <Categories value={categoryIndex} onChangeCategory={onChangeCategory}/>
                <Sort/>
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
                {
                    isLoading
                        ? skeletons
                        : pizzas
                }
            </div>
            <Pagination currentPage={currentPage} onChangePage={onChangePage}/>
        </div>
    )
}