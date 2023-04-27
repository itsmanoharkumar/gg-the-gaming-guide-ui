import { MKCharacterVariation } from "@/types/types";
import CharacterVariationCard from "@/components/atoms/CharacterVariationCard";
import { useRouter } from "next/router";

interface Props {
  variations: MKCharacterVariation[];
  isSearchResult?: boolean;
}

export default function CharacterVariationList({
  variations,
  isSearchResult,
}: Props) {
  const navigate = useRouter();

  function handleCharacterClick(id: number) {
    navigate.push("/mkCharacterVariation/" + id);
  }
  return (
    <div className={"flex flex-wrap justify-between sm:justify-start"}>
      {variations?.map((variation: MKCharacterVariation) => {
        const id = variation?.id;
        const {
          name,
          image: { data },
        } = variation?.attributes;
        return (
          <CharacterVariationCard
            name={name}
            key={id}
            id={id}
            image={data}
            isSearchResult={isSearchResult}
            onClick={handleCharacterClick}
          />
        );
      })}
    </div>
  );
}
