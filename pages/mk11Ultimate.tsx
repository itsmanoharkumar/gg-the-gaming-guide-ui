import { API_ROUTES } from "@/helpers/constants";
import fetcher from "@/service/service";
import { MK11Ultimate, MK11UltimateAttributes } from "@/types/mk11UltimateType";
import { MKCharacter } from "@/types/mkCharacterType";
import Head from "next/head";
import qs from "qs";
import CharacterList from "@/components/molecules/CharacterList";
import { useEffect, useState } from "react";
import Breadcrumbs from "@/components/atoms/Breadcrumbs";

export async function getStaticProps() {
  const query = qs.stringify({
    populate: {
      characters: {
            populate: ["image"],
          },
      },
  });
  const { data } = await fetcher(API_ROUTES.mk11Ultimate + "?" + query);
  return {
    props: {
      mk11UltimateData: data,
    },
  };
}

interface Props {
  mk11UltimateData: MK11Ultimate;
}

export default function Home({ mk11UltimateData }: Props) {
  const {
    name,
    characters: { data },
  }: MK11UltimateAttributes = mk11UltimateData?.attributes;
  const [searchTerm, setSearchTerm] = useState("");
  const [characterList, setCharacterList] = useState<
    MKCharacter[]
  >([]);
  const [searchResults, setSearchResults] = useState<MKCharacter[]>(
    []
  );

  useEffect(() => {
    const characterList = mk11UltimateData?.attributes.characters?.data;
    setCharacterList(characterList);
  }, [mk11UltimateData]);

  const hasCharacters = data?.length > 0;

  useEffect(() => {
    const results = characterList.filter((character) => {
      const name = character.attributes.name.toLowerCase();
      return (
        name.includes(searchTerm.toLowerCase())
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
            placeholder={"Search Character"}
          />
        </div>
        {!searchTerm && hasCharacters && (
          <CharacterList
            data={characterList}
            isSearchResult={true}
          />
        )}
        {searchTerm && hasCharacters && (
          <CharacterList
            data={searchResults}
            isSearchResult={true}
          />
        )}
      </main>
    </>
  );
}
