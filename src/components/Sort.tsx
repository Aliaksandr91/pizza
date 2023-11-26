import React, {useEffect, useRef, useState} from "react";
import {useDispatch} from "react-redux";
import {SortType} from "../redux/filter/types";
import {setSort} from "../redux/filter/slice";


export const sortArr:SortType[] = [
    {name: 'popularity (DESC)', sortProperty: 'rating'},
    {name: 'popularity (ASC)', sortProperty: '-rating'},
    {name: 'price (DESC)', sortProperty: 'price'},
    {name: 'price  (ASC)', sortProperty: '-price'},
    {name: 'alphabet (DESC)', sortProperty: 'title'},
    {name: 'alphabet (ASC)', sortProperty: '-title'}
]

type SortPropsType = {
    value:SortType
}

export const Sort: React.FC<SortPropsType> = React.memo(({value}) => {
    const [isVisible, setIsVisible] = useState(false)
    const dispatch = useDispatch()
    const sortRef = useRef<HTMLDivElement | null>(null)
    const onClickListItem = (objItem: SortType) => {
        dispatch(setSort(objItem))
        setIsVisible(false)
    }
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (sortRef.current && !event.composedPath().includes(sortRef.current)) {
                setIsVisible(false)
            }

        }
        document.body.addEventListener('click', handleClickOutside)
        return () => document.body.removeEventListener('click', handleClickOutside)

    }, []);
    return (
        <div ref={sortRef} className="sort">
            <div className="sort__label">
                <svg width="10" height="6" viewBox="0 0 10 6" fill="none"
                     xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
                        fill="#2C2C2C"></path>
                </svg>
                <b>Sort by:</b>
                <span onClick={() => setIsVisible(!isVisible)}>{value.name}</span>
            </div>
            {
                isVisible && <div className="sort__popup">
                    <ul>
                        {
                            sortArr.map((item, index) => {
                                return <li key={index} onClick={() => onClickListItem(item)}
                                           className={value.sortProperty === item.sortProperty ? "active" : ''}>{item.name}</li>
                            })
                        }
                    </ul>
                </div>
            }
        </div>
    )
})