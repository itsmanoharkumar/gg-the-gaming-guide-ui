interface Props {
  value: string;
}

const PLAYSTATION_BUTTONS_MAP: any = {
  square: "□",
  triangle: "△",
  circle: "○",
  cross: "✕",
  l1: "L1",
  l2: "L2",
  l3: "L3",
  r1: "R1",
  r2: "R2",
  r3: "R3",
  share: "Share",
  options: "Options",
  ps: "PS",
  touchpad: "Touchpad",
  up: "↑",
  down: "↓",
  left: "←",
  right: "→",
};

export default function PlaystationButton({ value }: Props) {
  const mappedValue = PLAYSTATION_BUTTONS_MAP[value];
  return (
    <div>
      {mappedValue && (
        <div
          className={
            "flex justify-center bg-white rounded-full w-[30px] h-[30px]"
          }
        >
          {mappedValue}
        </div>
      )}
      {!mappedValue && <div className={""}>{value}</div>}
    </div>
  );
}
