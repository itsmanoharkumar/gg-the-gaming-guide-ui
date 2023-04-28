import { API_ROUTES } from "@/helpers/constants";
import fetcher from "@/service/service";
import { MK11Ultimate, MK11UltimateAttributes } from "@/types/mk11UltimateType";
import { MKCharacter } from "@/types/mkCharacterType";
import Head from "next/head";
import qs from "qs";
import CharacterList from "@/components/molecules/CharacterList";
import { useEffect, useState } from "react";
import { MKCharacterVariation } from "@/types/types";
import CharacterVariationList from "@/components/molecules/CharacterVariationList";
import Breadcrumbs from "@/components/atoms/Breadcrumbs";

export async function getStaticProps() {
  const query = qs.stringify({
    populate: {
      mk_characters: {
        populate: {
          mk_character_variations: {
            populate: ["image", "mk_character"],
          },
        },
      },
    },
  });
  const { data } = await fetcher(API_ROUTES.mk11Ultimate + "?" + query);
  return {
    props: {
      mk11UltimateData: data,
    }, // will be passed to the page component as props
  };
}

interface Props {
  mk11UltimateData: MK11Ultimate;
}

export default function Home({ mk11UltimateData }: Props) {
  const {
    name,
    mk_characters: { data },
  }: MK11UltimateAttributes = mk11UltimateData?.attributes;
  const [searchTerm, setSearchTerm] = useState("");
  const [characterVariationList, setCharacterVariationList] = useState<
    MKCharacterVariation[]
  >([]);
  const [searchResults, setSearchResults] = useState<MKCharacterVariation[]>(
    []
  );
  const hasCharacters = data?.length > 0;
  const characters = data as MKCharacter[];
  useEffect(() => {
    const characterVariationList: MKCharacterVariation[] = [];
    characters.forEach((character) => {
      characterVariationList.push(
        ...character.attributes.mk_character_variations.data
      );
    });
    setCharacterVariationList(characterVariationList);
  }, data);

  useEffect(() => {
    const results = characterVariationList.filter((characterVariation) => {
      const name = characterVariation.attributes.name.toLowerCase();
      const characterName =
        characterVariation.attributes.mk_character.data.attributes.name.toLowerCase();
      return (
        name.includes(searchTerm.toLowerCase()) ||
        characterName.includes(searchTerm.toLowerCase())
      );
    });
    setSearchResults(results);
  }, [searchTerm]);
  return (
    <>
      <Head>
        <title>{name}</title>
      </Head>
      <main className={`min-h-screen p-4 mt-10 select-none`}>
        <Breadcrumbs
          breadcrumbList={[
            {
              name: "Home",
              isLink: true,
              link: "/",
            },
            {
              name: name,
              isLink: false,
            },
          ]}
        />
        <div className={"flex flex-wrap justify-start py-2 w-full sm:w-1/3"}>
          <input
            className={"p-1 rounded w-full border-gray-300 border"}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={"Search Character/Variation"}
          />
        </div>
        {!searchTerm && hasCharacters && (
          <CharacterList characters={characters} />
        )}
        {searchTerm && hasCharacters && (
          <CharacterVariationList
            variations={searchResults}
            isSearchResult={true}
          />
        )}
      </main>
    </>
  );
}
