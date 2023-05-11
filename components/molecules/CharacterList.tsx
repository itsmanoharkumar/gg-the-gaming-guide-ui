import { MKCharacter } from "@/types/mkCharacterType";
import CharacterVariationList from "@/components/molecules/CharacterVariationList";

interface Props {
  characters: MKCharacter[];
}

export default function CharacterList({ characters }: Props) {
  return (
    <div className={"rounded p-2 flex flex-wrap justify-start"}>
      {characters.map((character: MKCharacter) => {
        const id = character?.id;
        const attributes = character?.attributes;
        const name = attributes?.name;
        const variations = attributes?.variations;
        return (
          <div
            key={id}
            className={"mb-10 w-full sm:w-[50%] lg:w-[30%] xl:w-[20%]"}
          >
            <div className={"font-bold text-2xl"}>{name}</div>
            <CharacterVariationList variations={variations?.data} />
          </div>
        );
      })}
    </div>
  );
}
