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

  console.log({ banner });

  return (
    <div
      className={
        "p-2 rounded border-[1px] border-gray-500 cursor-pointer w-full flex flex-col justify-center items-center"
      }
      onClick={handleOnClick}
    >
      <div>
        <Image src={""} alt="Banner" />
      </div>
      <div className={""}>{gameName}</div>
    </div>
  );
}
