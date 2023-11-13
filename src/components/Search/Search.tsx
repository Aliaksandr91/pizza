import styles from './Search.module.scss'
import React, {ChangeEvent, useCallback, useState} from "react";
import {debounce} from "lodash";
import {useDispatch} from "react-redux";
import {setSearchValue} from "../../redux/filter/slice";


export const Search: React.FC = () => {

    const [value, setValue] = useState('')
    const inputRef = React.useRef<HTMLInputElement | null>(null)
    const dispatch = useDispatch()

    const onClickClear = () => {
        dispatch(setSearchValue(''))
        setValue('')
        inputRef.current?.focus();
    }

    const updateSearchValue = useCallback(
        debounce((str: string) => {
            dispatch(setSearchValue(str))
        }, 1000), []
    )
    const onChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
        setValue(event.currentTarget.value)
        updateSearchValue(event.currentTarget.value)
    }

    return (
        <div className={styles.root}>
            <svg className={styles.icon} viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><title/>
                <g id="search">
                    <path
                        d="M29.71,28.29l-6.5-6.5-.07,0a12,12,0,1,0-1.39,1.39s0,.05,0,.07l6.5,6.5a1,1,0,0,0,1.42,0A1,1,0,0,0,29.71,28.29ZM14,24A10,10,0,1,1,24,14,10,10,0,0,1,14,24Z"/>
                </g>
            </svg>
            <input
                ref={inputRef}
                value={value}
                onChange={onChangeInput}
                className={styles.input}
                placeholder={'Поиск пиццы...'}
            />
            {value &&
                <svg onClick={onClickClear} className={styles.ClearIcon} viewBox="0 0 20 20"
                     xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z"/>
                </svg>
            }

        </div>
    )
}