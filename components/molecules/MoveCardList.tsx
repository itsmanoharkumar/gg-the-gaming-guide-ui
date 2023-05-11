import React, { FunctionComponent } from "react";
import MoveCard from "@/components/molecules/MoveCard";
import { MKKeyCombo } from "@/types/mkKeyCombo";

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
