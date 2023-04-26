import { extractImageData } from "@/helpers/helper";
import { IMAGE_SIZE } from "@/types/enums";
import { StrapiImageData } from "@/types/ImageDataType";
import Image from "next/image";
import { useRouter } from "next/router";

interface Props {
  gameName: string;
  banner: StrapiImageData;
}

export default function GameCard({ gameName, banner }: Props) {
  const navigate = useRouter();
  function handleOnClick() {
    navigate.push("/mk11Ultimate");
  }

  const { width, height, src } = extractImageData(banner, IMAGE_SIZE.SMALL);
  return (
    <div
      className={
        "max-w-[300px] overflow-hidden rounded border-[1px] border-gray-200 cursor-pointer w-full flex flex-col" +
        " justify-center" +
        " items-center"
      }
      onClick={handleOnClick}
    >
      <div className={"overflow-hidden"}>
        <Image src={src} alt="Banner" width={width} height={height} />
      </div>
      <div className={"p-2"}>{gameName}</div>
    </div>
  );
}
