import { API_ROUTES } from "@/helpers/constants";
import fetcher from "@/service/service";
import { MK11Ultimate, MK11UltimateAttributes } from "@/types/mk11UltimateType";
import { MKCharacter, MKCharacterAttributes } from "@/types/mkCharacterType";
import { MKCharacterVariation } from "@/types/types";
import { useRouter } from "next/router";
import qs from "qs";

export async function getStaticProps() {
  const query = qs.stringify({
    populate: {
      mk_characters: {
        populate: ["mk_character_variations"],
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
  const navigate = useRouter();
  const {
    name,
    mk_characters: { data },
  }: MK11UltimateAttributes = mk11UltimateData?.attributes;
  const hasCharacters = data?.length > 0;
  const characters = data as MKCharacter[];

  function handleCharacterClick(id: number) {
    navigate.push("/mkCharacterVariation/" + id);
  }

  return (
    <main className={`min-h-screen p-4 mt-10 select-none`}>
      {name && <div className={"p-2 text-xl text-center"}>{name}</div>}
      {hasCharacters && (
        <div className={"rounded p-2 flex flex-wrap justify-start"}>
          {characters.map((character: MKCharacter) => {
            const id = character?.id;
            const attributes = character?.attributes;
            const name = attributes?.name;
            const variations = attributes?.mk_character_variations;
            return (
              <div
                key={id}
                className={`w-[100%] p-2 border-gray-200 border-[1px] rounded`}
              >
                {name}
                {variations?.data?.map((variation: MKCharacterVariation) => {
                  const name = variation?.attributes?.name;
                  return (
                    <div
                      key={variation.id}
                      className={
                        "p-2 flex justify-start border-gray-200 border-[1px]" +
                        " items-center w-[300] rounded cursor-pointer my-2"
                      }
                      onClick={() => {
                        handleCharacterClick(variation.id);
                      }}
                    >
                      {name}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      )}
    </main>
  );
}
