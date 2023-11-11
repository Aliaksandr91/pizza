import styles from './NotFoundBlock.module.scss'
import React from "react";

export const NotFoundBlock:React.FC = () => {
    return (
        <div className={styles.root}>
            <h1>Ничего не найдено :(</h1>
            <p className={styles.description}>К сожалению данная страница отсутствует</p>
        </div>

    )
}