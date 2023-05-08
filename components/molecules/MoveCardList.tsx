import React, { FunctionComponent } from "react";
import { MKKeyCombo, MKKeyComboAttributes } from "@/types/types";
import MoveCardTitle from "@/components/molecules/MoveCardTitle";
import MoveCardDetailSection from "@/components/molecules/MoveCardDetailSection";
import MoveCard from "@/components/molecules/MoveCard";
import { log } from "util";

export interface OwnProps {
  keyComboList: MKKeyCombo[];
}

type Props = OwnProps;

const MoveCardList: FunctionComponent<Props> = ({ keyComboList }) => {
  return (
    <>
      {keyComboList?.map((item) => {
        const attributes = item?.attributes;
        // console.log(attributes);
        return <MoveCard key={item.id} keyComboData={attributes} />;
      })}
    </>
  );
};

export default MoveCardList;
