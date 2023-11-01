export const Categories = ({value, onChangeCategory}:any) => {

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