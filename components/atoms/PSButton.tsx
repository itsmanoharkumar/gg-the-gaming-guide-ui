import Circle from '@/images/Circle.png';
import Cross from '@/images/Cross.png';
import Square from '@/images/Square.png';
import Triangle from '@/images/Triangle.png';
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
  if(value === '□') {
    return Square;
  } else if( value === '△')  {
    return Triangle;
  } else if( value === '○') {
    return Circle;
  } else {
    return Cross;
  }
}

export default function PlaystationButton({ value }: Props) {
  const mappedValue = PLAYSTATION_BUTTONS_MAP[value];
  let showImage = false;
  let psButtonImage;
  if(['□', "△" , '○', '✕' ].includes(mappedValue)){
    showImage = true;
    psButtonImage = getPsButtonImage(mappedValue);
  }

  return (
    <div className={'mx-1'}>
      {!showImage && mappedValue && (
        <div
          className={
            "flex justify-center bg-white rounded-full w-[30px] h-[30px] items-center font-semibold shadow"
          }
        >
          {mappedValue}
        </div>
      )}
      {
        showImage && <Image className={'w-[30px] min-w-[30px] max-w-[30px] shadow rounded-full'} src={psButtonImage|| ''} alt={mappedValue} />
      }
      {!mappedValue && <div className={""}>{value}</div>}
    </div>
  );
}
