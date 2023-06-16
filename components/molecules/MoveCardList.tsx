import React, {FunctionComponent} from "react";
import MoveCard from "@/components/molecules/MoveCard";
import {MKKeyCombo} from "@/types/mkKeyCombo";
import Grid from "@mui/material/Unstable_Grid2";

export interface OwnProps {
    keyComboList: MKKeyCombo[];
}

type Props = OwnProps;

const MoveCardList: FunctionComponent<Props> = ({keyComboList}) => {
    return (
        <Grid container spacing={2}>
            {keyComboList?.map((item) => {
                const attributes = item?.attributes;
                return (
                    <Grid key={item.id} xs={12} sm={6} md={4}>
                        <MoveCard key={item.id} keyComboData={attributes}/>
                    </Grid>
                )
            })}
        </Grid>
    );
};

export default MoveCardList;
