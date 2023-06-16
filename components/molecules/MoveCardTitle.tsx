import React, { FunctionComponent } from "react";
import PlaystationCommands from "@/components/molecules/PlaystationCommands";
import Grid from "@mui/material/Unstable_Grid2";
import {Typography} from "@mui/material";

export interface OwnProps {
  name: string;
  combos: string;
}

type Props = OwnProps;

const MoveCardTitle: FunctionComponent<Props> = ({ name, combos }) => {
  return (
    <Grid justifyContent={'space-between'} container spacing={2}
          flexWrap={'nowrap'}
    >
        <Grid sm={'auto'}>
            <Typography>{name}</Typography>
        </Grid>
        <Grid sm={'auto'}>
            <PlaystationCommands inputCommands={combos}/>
        </Grid>
    </Grid>
  );
};

export default MoveCardTitle;
