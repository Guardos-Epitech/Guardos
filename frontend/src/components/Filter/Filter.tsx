import React from "react";
import styles from "./Filter.module.scss"

const Filter = () => {
    return (
        <div className={styles.RectFilter}>
            <div>
                <span className={styles.TitleFilter}>Filter by:</span>
            </div>
            <div>
                <span className={styles.TitleSubFilter}>Rating:</span>
            </div>
            <div>
                <span className={styles.TitleSubFilter}>Range:</span>
            </div>
        </div>
    )
}

export default Filter;