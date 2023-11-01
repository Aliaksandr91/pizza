import React, {useEffect, useState} from "react";
import {Categories} from "../components/Categories";
import {Sort} from "../components/Sort";
import {Skeleton} from "../components/PizzaBlock/Skeleton";
import {PizzaBlock} from "../components/PizzaBlock/PizzaBlock";

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
export const Home = ()=> {
    const [items, setItems] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    useEffect(() => {
        fetch('https://6540fd8045bedb25bfc3032e.mockapi.io/items')
            .then(res => res.json())
            .then(items => {
                setItems(items)
                setIsLoading(false)
            })
        window.scrollTo(0,0)
    }, [])
    return (
        <div className={'container'}>
            <div className="content__top">
                <Categories/>
                <Sort/>
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">

                {
                    isLoading
                        ? [...new Array(6)].map((_, index) => <Skeleton key={index}/>)
                        : items.map((pizza: PizzaType) => <PizzaBlock key={pizza.id} {...pizza}/>)
                }

            </div>
        </div>
    )
}