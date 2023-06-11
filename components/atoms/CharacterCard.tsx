import { StrapiImageData } from "@/types/ImageDataType";
import Image from "next/image";
import { extractImageData } from "@/helpers/helper";
import { IMAGE_SIZE } from "@/types/enums";

interface Props {
  name: string;
  id: number;
  onClick: (id: number) => void;
  image: StrapiImageData;
  isSearchResult?: boolean;
}

export default function CharacterCard({
  id,
  name,
  onClick,
  image,
  isSearchResult,
}: Props) {
  const { src, height, width } = extractImageData(image, IMAGE_SIZE.SMALL);
  return (
    <div
      className={
        "border-gray-200 border-[1px] transition-all " +
        " items-center rounded w-[45%] cursor-pointer my-2 mr-2 overflow-hidden" +
        (isSearchResult ? " w-[45%] sm:w-[20%] lg:w-[10%]" : "")
      }
      onClick={() => {
        onClick(id);
      }}
    >
      <div className={"flex justify-center w-full h-[200px]"}>
        <Image
          className={"w-full object-cover object-top"}
          src={src}
          alt={name}
          width={width}
          height={height}
          loading={"lazy"}
        />
      </div>
      <div className={"text-center text-sm py-2 font-semibold"}>{name}</div>
    </div>
  );
}
