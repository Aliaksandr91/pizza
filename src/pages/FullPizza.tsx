import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";


export const FullPizza = () => {
    const {id} = useParams()
    const [pizza, setPizza] = useState<{
        imageUrl: string;
        title: string;
        price: number;
    }>();
    useEffect(() => {

        async function fetchPizza() {
            try {
                const {data} = await axios.get('https://6540fd8045bedb25bfc3032e.mockapi.io/items/' + id)
                console.log(data)
                setPizza(data)
            } catch (error) {
                console.log(error)
            }
        }

        fetchPizza()
    }, []);
    if (!pizza) {
        return <>Loading</>;
    }
    return (
        <div className={'container'}>
            <h2>{pizza.title}</h2>
            <img src={pizza.imageUrl} alt="Pizza"/>
            <p>aaaaaaaaaa</p>
        </div>
    )
}