import React, {useEffect, useState} from 'react';
import {Header} from "./components/Header";
import {Categories} from "./components/Categories";
import {Sort} from "./components/Sort";
import {PizzaBlock} from "./components/PizzaBlock";
import './scss/app.scss'

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

function App() {
    const [items, setItems] = useState([])
    useEffect(() => {
        fetch('https://6540fd8045bedb25bfc3032e.mockapi.io/items')
            .then(res => res.json())
            .then(items => setItems(items))
    }, [])
    return (
        <div className="wrapper">
            <Header/>
            <div className="content">
                <div className="container">
                    <div className="content__top">
                        <Categories/>
                        <Sort/>
                    </div>
                    <h2 className="content__title">Все пиццы</h2>
                    <div className="content__items">
                        {items.map((pizza: PizzaType) => <PizzaBlock key={pizza.id} {...pizza}/>)}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
