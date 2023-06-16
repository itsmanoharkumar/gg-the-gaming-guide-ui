import React, { FunctionComponent } from "react";
import MoveCardTitle from "@/components/molecules/MoveCardTitle";
import MoveCardDetailSection from "@/components/molecules/MoveCardDetailSection";
import { frameData } from "framer-motion";
import { MKKeyComboAttributes } from "@/types/mkKeyCombo";
import {Card, CardContent} from "@mui/material";

export interface OwnProps {
  keyComboData: MKKeyComboAttributes;
}

type Props = OwnProps;

const MoveCard: FunctionComponent<Props> = ({ keyComboData }) => {
  const { name, combo, frameData, moveData }: MKKeyComboAttributes =
    keyComboData;
  return (
    <Card
    >
      <CardContent>
      <MoveCardTitle name={name} combos={combo} />
      {/*<MoveCardDetailSection frameData={frameData} moveData={moveData} />*/}
      </CardContent>
    </Card>
  );
};

export default MoveCard;
