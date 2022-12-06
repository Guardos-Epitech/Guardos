import React from "react";
import {Chip} from "@mui/material";

import styles from "@src/components/menu/AllergenTags/AllergenTags.module.scss";

type AllergenTagsProps = {
    dishAllergens: string[]
}

const AllergenTags = (props: AllergenTagsProps) => {
    const dishAllergens = props.dishAllergens;

    return (
        <>
            <p className={styles.lowerBottomMargin}>
                {"Allergens:"}
            </p>
            {dishAllergens.length != 0 && dishAllergens.map((allergen) => (
                <Chip
                    key={allergen}
                    label={allergen}
                    color="error"
                    variant="outlined"
                    size="small"
                    sx={{ m: 0.5 }}
                />
            ))}
        </>
    )
}

export default AllergenTags;