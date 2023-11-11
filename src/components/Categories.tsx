import React from "react";

type CategoriesPropsTypes = {
    value: number
    onChangeCategory: (i: number) => void
}
export const Categories: React.FC<CategoriesPropsTypes> = ({value, onChangeCategory}) => {

    const categories = [
        'Все',
        'Мясные',
        'Вегетарианская',
        'Гриль',
        'Острые',
        'Закрытые'
    ]

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
}