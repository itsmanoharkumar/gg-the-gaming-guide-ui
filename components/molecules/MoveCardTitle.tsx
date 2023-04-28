import React, { FunctionComponent } from "react";
import PlaystationCommands from "@/components/molecules/PlaystationCommands";

export interface OwnProps {
  name: string;
  inputCommands: string;
}

type Props = OwnProps;

const MoveCardTitle: FunctionComponent<Props> = ({ name, inputCommands }) => {
  return (
    <div
      className={
        "p-2 flex justify-between flex-wrap border-b pb-1 items-center"
      }
    >
      <div className={"font-bold text-xl mb-2 flex items-center"}>{name}</div>
      <PlaystationCommands inputCommands={inputCommands} />
    </div>
  );
};

export default MoveCardTitle;
