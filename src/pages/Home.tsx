import React, {useContext, useEffect, useState} from "react";
import {Categories} from "../components/Categories";
import {Sort} from "../components/Sort";
import {Skeleton} from "../components/PizzaBlock/Skeleton";
import {PizzaBlock} from "../components/PizzaBlock/PizzaBlock";
import {Pagination} from "../components/Pagination/Pagination";
import {SearchContext, SearchContextType} from "../App";

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

    const context = useContext(SearchContext);
    if (context === undefined) {
        throw new Error("useSearch must be used within a SearchProvider");
    }
    const { searchValue } = context as SearchContextType;

    const [items, setItems] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    const [currentPage, setCurrentPage] = useState(1)

    const [categoryIndex, setCategoryIndex] = useState(0)
    const [sortType, setSortType] = useState({name: 'популярности', sortProperty: 'rating'})


    useEffect(() => {
        setIsLoading(true)
        const order = sortType.sortProperty.includes('-') ? 'asc' : 'desc'
        const sortBy = sortType.sortProperty.replace('-', '')
        const category = categoryIndex > 0 ? `category=${categoryIndex}` : ''
        const search = searchValue ? `&search=${searchValue}` : ''
        fetch(`https://6540fd8045bedb25bfc3032e.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`)
            .then(res => res.json())
            .then(items => {
                setItems(items)
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
                <Categories value={categoryIndex} onChangeCategory={(i: number) => setCategoryIndex(i)}/>
                <Sort value={sortType} onChangeSort={(i: SortObjType) => setSortType(i)}/>
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
                {
                    isLoading
                        ? skeletons
                        : pizzas
                }
            </div>
            <Pagination onChangePage={(number:number)=>setCurrentPage(number)}/>
        </div>
    )
}