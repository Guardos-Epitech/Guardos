import React from "react";
import {Container} from "@mui/material";

import styles from "@src/components/layout/Layout.module.scss";

interface ILayoutProps {
    children: React.ReactNode;
}

const Layout = (props: ILayoutProps) => {
    return (
        <div className={styles.outerColor}>
            <Container maxWidth={"lg"}>
                <div className={styles.innerColor}>
                    {props.children}
                </div>
            </Container>
        </div>
    )
}

export default Layout;