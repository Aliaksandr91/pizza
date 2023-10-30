import React, {useState} from "react";

export const Categories = () => {
    const [activeIndex, setActiveIndex] = useState(0)
    const categories = [
        'Все',
        'Мясные',
        'Вегетарианская',
        'Гриль',
        'Острые',
        'Закрытые'
    ]
    const onClickCategory = (value: number) => {
        setActiveIndex(value)
    }
    return (
        <div className="categories">
            <ul>
                {
                    categories.map((category, index) => {
                        return <li onClick={() => onClickCategory(index)}
                                   className={activeIndex === index ? "active" : ''}>{category}</li>
                    })
                }
            </ul>
        </div>
    )
}