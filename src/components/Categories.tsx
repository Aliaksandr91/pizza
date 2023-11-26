import React from "react";
import { useWhyDidYouUpdate } from 'ahooks';

type CategoriesPropsTypes = {
    value: number
    onChangeCategory: (i: number) => void
}
const categories = [
    'All',
    'Meat',
    'Vegetarian',
    'Grilled',
    'Spicy',
    'Closed'
]
export const Categories: React.FC<CategoriesPropsTypes> = React.memo(({value, onChangeCategory}) => {
    return (
        <div className="categories">
            <ul>
                {
                    categories.map((category, index) => {
                        return <li key={index} onClick={() => onChangeCategory(index)}
                                   className={value === index ? "active" : ''}>{category}</li>
                    })
                }
            </ul>
        </div>
    )
})