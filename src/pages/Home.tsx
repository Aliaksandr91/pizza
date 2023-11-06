import React, {useContext, useEffect, useRef, useState} from "react";
import {Categories} from "../components/Categories";
import {Sort, sortArr} from "../components/Sort";
import {Skeleton} from "../components/PizzaBlock/Skeleton";
import {PizzaBlock} from "../components/PizzaBlock/PizzaBlock";
import {Pagination} from "../components/Pagination/Pagination";
import {SearchContext, SearchContextType} from "../App";
import {useSelector, useDispatch} from 'react-redux'
import {RootStateType} from "../redux/store";
import {setCategoryIndex, setCurrentPage, setFilters} from "../redux/slices/filterSlice";
import axios from "axios";
import qs from 'qs'
import {useNavigate} from "react-router-dom";


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
    const isSearch = useRef(false)
    const isMounted = useRef(false)
    const navigate = useNavigate()
    const onChangeCategory = (index: number) => {
        dispatch(setCategoryIndex(index))
    }

    const onChangePage = (pageNumber: number) => {
        dispatch(setCurrentPage(pageNumber))
    }

    const fetchPizzas = () => {
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
    }

    const context = useContext(SearchContext);
    if (context === undefined) {
        throw new Error("useSearch must be used within a SearchProvider");
    }
    const {searchValue} = context as SearchContextType;

    const [items, setItems] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        if (isMounted.current) {
            const queryString = qs.stringify({
                sortProperty: sortType,
                categoryIndex,
                currentPage
            })
            navigate(`?${queryString}`)
        }
        isMounted.current = true
    }, [categoryIndex, sortType, currentPage]);
    
    useEffect(() => {
        if (window.location.search) {
            const params = qs.parse(window.location.search.substring(1))
            const sort = sortArr.find(obj => obj.sortProperty === params.sortProperty)
            dispatch(setFilters({
                ...params,
                sort
            }))
            isSearch.current = true
        }
    }, []);


    useEffect(() => {
        window.scrollTo(0, 0)
        if (!isSearch.current) {
            fetchPizzas()
        }
        isSearch.current = false
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