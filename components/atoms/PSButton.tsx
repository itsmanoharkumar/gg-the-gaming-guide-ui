import Circle from "@/images/circle.svg";
import Cross from "@/images/cross.svg";
import Square from "@/images/square.svg";
import Triangle from "@/images/triangle.svg";
import Up from "@/images/up.svg";
import Down from "@/images/triangle.svg";
import Left from "@/images/triangle.svg";
import Right from "@/images/triangle.svg";
import L1 from "@/images/L1.svg";
import L2 from "@/images/L2.svg";
import L3 from "@/images/L3.svg";
import R1 from "@/images/R1.svg";
import R2 from "@/images/R2.svg";
import R3 from "@/images/R3.svg";
import Image from "next/image";

interface Props {
  value: string;
}

const PLAYSTATION_BUTTONS_MAP: any = {
  square: "□",
  triangle: "△",
  circle: "○",
  cross: "✕",
  L1: "L1",
  L2: "L2",
  L3: "L3",
  R1: "R1",
  R2: "R2",
  R3: "R3",
  share: "Share",
  options: "Options",
  ps: "PS",
  touchpad: "Touchpad",
  up: "↑",
  down: "↓",
  left: "←",
  right: "→",
};

function getPsButtonImage(value: string) {
  if (value === "□") {
    return Square;
  } else if (value === "△") {
    return Triangle;
  } else if (value === "○") {
    return Circle;
  } else if (value === "✕") {
    return Cross;
  } else if (value === "↑") {
    return Up;
  } else if (value === "↓") {
    return Down;
  } else if (value === "←") {
    return Left;
  } else if (value === "→") {
    return Right;
  } else if (value === "L1") {
    return L1;
  } else if (value === "L2") {
    return L2;
  } else if (value === "L3") {
    return L3;
  } else if (value === "R1") {
    return R1;
  } else if (value === "R2") {
    return R2;
  } else if (value === "R3") {
    return R3;
  } else return null;
}

export default function PlaystationButton({ value }: Props) {
  const mappedValue = PLAYSTATION_BUTTONS_MAP[value];
  let showImage = false;
  let psButtonImage;
  if (
    [
      "□",
      "△",
      "○",
      "✕",
      "L1",
      "L2",
      "L3",
      "R1",
      "R2",
      "R3",
      "↑",
      "↓",
      "←",
      "→",
    ].includes(mappedValue)
  ) {
    showImage = true;
    psButtonImage = getPsButtonImage(mappedValue);
  }

  return (
    <div className={"mx-1"}>
      {!showImage && mappedValue && (
        <div
          className={
            "flex justify-center bg-white w-[30px] h-[30px] items-center font-semibold shadow"
          }
        >
          {mappedValue}
        </div>
      )}
      {showImage && (
        <Image
          className={"w-[30px] min-w-[30px] max-w-[30px]"}
          src={psButtonImage || ""}
          alt={mappedValue}
        />
      )}
      {!mappedValue && <div>{value}</div>}
    </div>
  );
}
