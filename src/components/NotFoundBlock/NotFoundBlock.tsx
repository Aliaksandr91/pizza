import styles from './NotFoundBlock.module.scss'
import React from "react";

export const NotFoundBlock:React.FC = () => {
    return (
        <div className={styles.root}>
            <h1>Oops :(</h1>
            <p className={styles.description}>404 page not found</p>
        </div>

    )
}