import React, { FunctionComponent } from "react";
import MoveCardTitle from "@/components/molecules/MoveCardTitle";
import MoveCardDetailSection from "@/components/molecules/MoveCardDetailSection";
import { frameData } from "framer-motion";
import { MKKeyComboAttributes } from "@/types/mkKeyCombo";

export interface OwnProps {
  keyComboData: MKKeyComboAttributes;
}

type Props = OwnProps;

const MoveCard: FunctionComponent<Props> = ({ keyComboData }) => {
  const { name, combo, frameData, moveData }: MKKeyComboAttributes =
    keyComboData;
  return (
    <div
      className={
        "shadow-md border border-gray-100 rounded w-full sm:w-[47%] lg:w-[450px] xl:w-[600px] p-4"
      }
    >
      <MoveCardTitle name={name} combos={combo} />
      <MoveCardDetailSection frameData={frameData} moveData={moveData} />
    </div>
  );
};

export default MoveCard;
