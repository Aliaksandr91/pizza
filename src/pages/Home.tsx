import React, {useEffect, useRef, useState} from "react";
import {Categories} from "../components/Categories";
import {Sort, sortArr} from "../components/Sort";
import {Skeleton} from "../components/PizzaBlock/Skeleton";
import {PizzaBlock} from "../components/PizzaBlock/PizzaBlock";
import {Pagination} from "../components/Pagination/Pagination";
import {useSelector} from 'react-redux'
import {selectFilter, setCategoryIndex, setCurrentPage, setFilters} from "../redux/slices/filterSlice";
import qs from 'qs'
import {useNavigate} from "react-router-dom";
import {fetchPizzas, selectPizzaData} from "../redux/slices/pizzaSlice";
import {useAppDispatch} from "../redux/store";


export const Home: React.FC = () => {
    const {categoryIndex, sort, currentPage, searchValue} = useSelector(selectFilter)
    const {items, status} = useSelector(selectPizzaData)
    const sortType = sort.sortProperty
    const dispatch = useAppDispatch()
    const isSearch = useRef(false)
    const isMounted = useRef(false)
    const navigate = useNavigate()

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

        dispatch(fetchPizzas({
            order,
            sortBy,
            category,
            search,
            currentPage
        }));
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
            if (sort) params.sort = sort
            dispatch(setFilters({
                searchValue: '',
                sort: sort || sortArr[0],
                categoryIndex: Number(params.categoryIndex),
                currentPage: Number(params.currentPage),
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
        .map((pizza: any) => <PizzaBlock  {...pizza}/>)
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