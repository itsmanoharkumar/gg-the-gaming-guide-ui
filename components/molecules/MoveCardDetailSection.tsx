import React, { FunctionComponent, useEffect } from "react";
import { frameData } from "framer-motion";
import { MKFrameData, MKMoveData } from "@/types/types";
import { MOVE_TYPE } from "@/types/enums";

export interface OwnProps {
  frameData: MKFrameData;
  moveData: MKMoveData;
}

type Props = OwnProps;

const MoveCardDetailSection: FunctionComponent<Props> = ({
  frameData,
  moveData,
}) => {
  const [showDetails, setShowDetails] = React.useState<boolean>(false);
  const toggleButtonText = showDetails ? "Hide Details" : "Show Details";
  const { active, startUp, recovery, cancel, hitAdv, blockAdv, fBlockAdv } =
    frameData;
  const { blockDamage, damage, fBlockDamage, moveType, specialNotes, notes } =
    moveData;
  const dataGroup1: Record<string, string> = {
    active: "Active",
    startUp: "Startup",
    recovery: "Recovery",
  };
  const dataGroup1Keys: string[] = Object.keys(dataGroup1);

  const dataGroup2: Record<string, string> = {
    cancel: "Cancel",
  };
  const dataGroup2Keys: string[] = Object.keys(dataGroup2);

  const dataGroup3: Record<string, string> = {
    hitAdv: "Hit Adv",
    blockAdv: "Block Adv",
    fBlockAdv: "F/Block Adv",
  };
  const dataGroup3Keys: string[] = Object.keys(dataGroup3);

  const moveDataMap: Record<string, string> = {
    blockDamage: "Block Damage",
    fBlockDamage: "F/Block Damage",
  };
  const moveDataKeys: string[] = Object.keys(moveDataMap);

  return (
    <div className={"p-2"}>
      <div className={"pb-2 flex justify-between"}>
        <div>
          <div
            className={"text-sm border rounded inline-block px-1 bg-orange-100"}
          >
            {moveType} Attack
          </div>
          <div
            className={
              "text-sm font-semibold border rounded inline-block px-1 bg-gray-200 ml-1"
            }
          >
            Damage {damage}
          </div>
        </div>
        <button
          className={"place-items-end px-1 border rounded text-sm font-mono"}
          onClick={() => {
            setShowDetails(!showDetails);
          }}
        >
          {toggleButtonText}
        </button>
      </div>
      <div className={`${showDetails ? "" : "hidden"}`}>
        <div className={"font-mono p-1 rounded shadow mt-1"}>
          <div className={"flex flex-wrap mt-1 gap-1 gap-x-3"}>
            {dataGroup1Keys.map((key: string) => {
              const label: string = dataGroup1[key];
              const value: number = frameData[key as keyof MKFrameData];
              return (
                <div
                  key={label}
                  className={
                    "text-sm font-medium border rounded inline-block px-1 bg-gray-200 shadow" +
                    (value ? "" : " opacity-20")
                  }
                >
                  <span className={"text-xs"}> {label} </span>
                  {value || "N/A"}
                </div>
              );
            })}
          </div>
          <div className={"flex flex-wrap mt-1 gap-1 gap-x-3"}>
            {dataGroup2Keys.map((key: string) => {
              const label: string = dataGroup2[key];
              const value: number = frameData[key as keyof MKFrameData];
              return (
                <div
                  key={label}
                  className={
                    "text-sm font-medium border rounded inline-block px-1 bg-gray-200" +
                    (value ? "" : " opacity-20")
                  }
                >
                  <span className={"text-xs"}> {label} </span>

                  {value || "N/A"}
                </div>
              );
            })}
          </div>
          <div className={"flex flex-wrap my-1 gap-1 gap-x-3"}>
            {dataGroup3Keys.map((key: string) => {
              const label: string = dataGroup3[key];
              const value: number = frameData[key as keyof MKFrameData];
              return (
                <div
                  key={label}
                  className={
                    "text-sm font-medium border rounded inline-block px-1 bg-gray-100" +
                    (value ? "" : " opacity-20")
                  }
                >
                  <span className={"text-xs"}> {label} </span>

                  {value || "N/A"}
                </div>
              );
            })}
          </div>
          <div className={"flex flex-wrap gap-1 gap-x-2"}>
            {moveDataKeys.map((key: string) => {
              const label: string = moveDataMap[key];
              const value: number | string | MOVE_TYPE =
                moveData[key as keyof MKMoveData];
              return (
                <div
                  key={label}
                  className={
                    "text-sm font-medium border rounded inline-block px-1" +
                    (value ? "" : " opacity-20")
                  }
                >
                  <span className={"text-xs"}> {label} </span>
                  {value || "N/A"}
                </div>
              );
            })}
          </div>
        </div>
        {(notes || specialNotes) && (
          <div className={"shadow rounded p-2 mt-2"}>
            <div className={"text-sm font-extralight"}>{notes}</div>
            <div className={"flex justify-start font-mono"}>{specialNotes}</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MoveCardDetailSection;
