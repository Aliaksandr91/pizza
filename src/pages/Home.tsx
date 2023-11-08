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
import qs from 'qs'
import {useNavigate} from "react-router-dom";
import {fetchPizzas} from "../redux/slices/pizzaSlice";


type PizzaType = {
    id: string
    imageUrl: string
    title: string
    types: number[]
    sizes: number[]
    price: number
    category: number
    rating: number
}

export type SortObjType = {
    name: string
    sortProperty: string
}


export const Home = () => {
    const {categoryIndex, sort, currentPage} = useSelector((state: RootStateType) => state.filter)
    const {items, status} = useSelector((state: RootStateType) => state.pizza)
    const sortType = sort.sortProperty
    const dispatch = useDispatch()
    const isSearch = useRef(false)
    const isMounted = useRef(false)
    const navigate = useNavigate()
    const context = useContext(SearchContext);
    if (context === undefined) {
        throw new Error("useSearch must be used within a SearchProvider");
    }
    const {searchValue} = context as SearchContextType;


    const onChangeCategory = (index: number) => {
        dispatch(setCategoryIndex(index))
    }

    const onChangePage = (pageNumber: number) => {
        dispatch(setCurrentPage(pageNumber))
    }

    const getPizzas = async () => {
        const sortBy = sortType.replace('-', '')
        const order = sortType.includes('-') ? 'asc' : 'desc'
        const category = categoryIndex > 0 ? `category=${String(categoryIndex)}` : ''
        const search = searchValue ? `&search=${searchValue}` : ''
        dispatch(
            fetchPizzas({
                sortBy,
                order,
                category,
                search,
                currentPage: String(currentPage),
            }),
        );
        window.scrollTo(0, 0);
    }


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
            getPizzas()
        }
        isSearch.current = false
    }, [categoryIndex, sortType, searchValue, currentPage])


    const pizzas = items
        .map((pizza: any) => <PizzaBlock key={pizza.id} {...pizza}/>)
    const skeletons = [...new Array(6)].map((_, index) => <Skeleton key={index}/>)
    return (
        <div className={'container'}>
            <div className="content__top">
                <Categories value={categoryIndex} onChangeCategory={onChangeCategory}/>
                <Sort/>
            </div>
            <h2 className="content__title">Все пиццы</h2>
            {status === 'error' ? (
                <div className="content__error-info">
                    <h2>Произошла ошибка 😕</h2>
                    <p>Не удалось получить пиццы. Попробуйте повторить попытку позже.</p>
                </div>
            ) : (
                <div className="content__items">{status === 'loading' ? skeletons : pizzas}</div>
            )}
            <Pagination currentPage={currentPage} onChangePage={onChangePage}/>
        </div>
    )
}