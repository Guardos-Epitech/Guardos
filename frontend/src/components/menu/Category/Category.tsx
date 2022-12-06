import React from "react";
import {Divider} from "@mui/material";

import styles from "@src/components/menu/Category/Category.module.scss";

type Props = {
    title: string;
    children: React.ReactNode;
}

const Category = (props: Props) => {
    return (
        <div className={styles.categoryBox}>
            <Divider textAlign={"left"}>
                <h2>
                    {props.title}
                </h2>
            </Divider>
            {props.children}
        </div>
    )
}

export default Category;