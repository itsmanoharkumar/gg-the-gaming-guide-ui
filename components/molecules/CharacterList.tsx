import CharacterCard from "@/components/atoms/CharacterCard";
import { useRouter } from "next/router";
import { MKCharacter } from "@/types/mkCharacter";

interface Props {
  data: MKCharacter[];
  isSearchResult?: boolean;
}

export default function CharacterList({ data, isSearchResult }: Props) {
  const navigate = useRouter();

  function handleCharacterClick(id: number) {
    navigate.push("/mkCharacter/" + id);
  }
  return (
    <div className={"flex flex-wrap justify-between sm:justify-start"}>
      {data?.map((item: MKCharacter) => {
        const id = item?.id;
        const {
          name,
          image: { data },
        } = item?.attributes;
        return (
          <CharacterCard
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
