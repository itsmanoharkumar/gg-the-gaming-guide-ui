import { API_ROUTES } from "@/helpers/constants";
import fetcher from "@/service/service";
import { MKKeyCombo, MKKeyComboAttributes } from "@/types/types";
import { divide } from "lodash";
import qs from "qs";
import Breadcrumbs from "@/components/atoms/Breadcrumbs";
import Head from "next/head";
import { useEffect, useState } from "react";
import PlaystationCommands from "@/components/molecules/PlaystationCommands";
import MoveCardTitle from "@/components/molecules/MoveCardTitle";
import MoveCardDetailSection from "@/components/molecules/MoveCardDetailSection";
import MoveCardList from "@/components/molecules/MoveCardList";

export async function getStaticProps({ params }: { params: { id: number } }) {
  const query = qs.stringify({
    populate: {
      mk_key_combos: {
        populate: ["frameData", "moveData", "mk_key_combo_subcategory"],
        sort: ["moveData.damage:desc"],
      },
      mk_character: {
        populate: "*",
      },
    },
  });
  const mkCharacterVariationData = await fetcher(
    API_ROUTES.mkCharacterVariations + `/${params.id}?${query}`
  );
  const characterName =
    mkCharacterVariationData?.data?.attributes?.mk_character?.data?.attributes
      ?.name || null;
  const variationName = mkCharacterVariationData?.data?.attributes?.name;
  const data = mkCharacterVariationData?.data?.attributes?.mk_key_combos?.data;
  return {
    props: {
      keyComboList: data,
      characterName,
      variationName,
    }, // will be passed to the page component as props
  };
}

export async function getStaticPaths() {
  const mkCharacterVariations = await fetcher(API_ROUTES.mkCharacterVariations);
  const characterData = mkCharacterVariations?.data;
  const paths = characterData?.map((item: any) => ({
    params: {
      id: String(item.id),
    },
  }));
  return {
    paths,
    fallback: false, // can also be true or 'blocking'
  };
}

export default function Home({
  keyComboList,
  characterName,
  variationName,
}: {
  keyComboList: MKKeyCombo[];
  characterName: string;
  variationName: string;
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredKeyComboList, setFilteredKeyComboList] = useState<
    MKKeyCombo[]
  >([]);
  useEffect(() => {
    if (searchTerm) {
      const filteredList = keyComboList.filter((item) => {
        const attributes = item?.attributes;
        const { name, inputCommands }: MKKeyComboAttributes = attributes;
        return (
          name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          inputCommands.toLowerCase().includes(searchTerm.toLowerCase())
        );
      });
      setFilteredKeyComboList(filteredList);
    }
  }, [searchTerm]);
  return (
    <>
      <Head>
        <title>{characterName + " | " + variationName}</title>
      </Head>
      <main className={`min-h-screen p-4 mt-10 select-none`}>
        <Breadcrumbs
          breadcrumbList={[
            {
              name: "Mortal Kombat 11 Ultimate",
              link: "/",
              isLink: true,
            },
            {
              name: "Characters",
              link: "/mk11Ultimate",
              isLink: true,
            },
            {
              name: characterName,
              isLink: false,
            },
            {
              name: variationName,
              isLink: false,
            },
          ]}
        />
        <div className={"flex flex-wrap justify-start py-2 w-full sm:w-1/3"}>
          <input
            className={"p-1 rounded w-full border-gray-300 border"}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={"Search Attack"}
          />
        </div>
        <div className={"flex flex-wrap gap-10 overflow-y-auto mt-2"}>
          {!searchTerm && <MoveCardList keyComboList={keyComboList} />}
          {searchTerm && <MoveCardList keyComboList={filteredKeyComboList} />}
        </div>
      </main>
    </>
  );
}
