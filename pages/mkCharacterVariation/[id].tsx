import { API_ROUTES } from "@/helpers/constants";
import fetcher from "@/service/service";

import {
  MKKeyCombo,
  MKKeyComboAttributes,
  MKKeyComboCategory,
  MKKeyComboCategoryAttributes,
  MKKeyComboSubcategory,
  MKKeyComboSubcategoryAttributes,
} from "@/types/types";
import { divide, min } from "lodash";
import qs from "qs";
import Breadcrumbs from "@/components/atoms/Breadcrumbs";
import Head from "next/head";
import { useEffect, useState } from "react";
import MoveCardList from "@/components/molecules/MoveCardList";
import SoftTab from "@/components/atoms/SoftTab";
import { log } from "util";

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

  const keyComboCategoryList = await fetcher(
    API_ROUTES.mkKeyComboCategories + `?populate=*`
  );
  const keyComboCategoryData = keyComboCategoryList?.data;

  return {
    props: {
      keyComboList: data,
      characterName,
      variationName,
      keyComboCategoryData,
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
  console.log({ paths });
  return {
    paths,
    fallback: true, // can also be true or 'blocking'
  };
}

export default function Home({
  keyComboList,
  characterName,
  variationName,
  keyComboCategoryData,
}: {
  keyComboList: MKKeyCombo[];
  characterName: string;
  variationName: string;
  keyComboCategoryData: MKKeyComboCategory[];
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredKeyComboList, setFilteredKeyComboList] = useState<
    MKKeyCombo[]
  >([]);
  const [tabList, setTabList] = useState<any>([]);
  const [selectedTab, setSelectedTab] = useState(0);
  const [selectedSubCategoryList, setSelectedSubCategoryList] = useState<
    | {
        id: number;
        attributes: MKKeyComboSubcategoryAttributes;
        keyComboList: MKKeyCombo[];
      }[]
    | undefined
  >(undefined);
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
  useEffect(() => {
    const tabList2 = keyComboCategoryData?.map((item) => {
      return {
        label: item.attributes.name,
        id: item.id,
      };
    });
    tabList2?.unshift({
      label: "All",
      id: 0,
    });
    setTabList(tabList2);
  }, []);

  useEffect(() => {
    const selectedKeyComboCategoryData = keyComboCategoryData.find(
      (category) => {
        return category.id === selectedTab;
      }
    );
    const selectedKeyComboSubCategoryDataList =
      selectedKeyComboCategoryData?.attributes.mk_key_combo_subcategories.data;
    console.log(selectedKeyComboSubCategoryDataList);
    const mkKeyComboSubcategories = selectedKeyComboSubCategoryDataList?.map(
      (item) => {
        return {
          ...item,
          keyComboList: keyComboList?.filter((keyCombo) => {
            const attributes = keyCombo?.attributes;
            const { mk_key_combo_subcategory }: MKKeyComboAttributes =
              attributes;
            return mk_key_combo_subcategory?.data?.id === item.id;
          }),
        };
      }
    );
    setSelectedSubCategoryList(mkKeyComboSubcategories);
  }, [selectedTab]);

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
        {!searchTerm && (
          <SoftTab
            tabList={tabList}
            selectedTab={selectedTab}
            onClick={setSelectedTab}
          />
        )}
        {searchTerm && <div>Search Result</div>}
        {(selectedTab === 0 || searchTerm) && (
          <div className={"flex flex-wrap gap-10 overflow-y-auto mt-2"}>
            {!searchTerm && <MoveCardList keyComboList={keyComboList} />}
            {searchTerm && <MoveCardList keyComboList={filteredKeyComboList} />}
          </div>
        )}
        {selectedTab !== 0 && !searchTerm && (
          <div className={"mt-2"}>
            {selectedSubCategoryList?.map((item) => {
              return (
                <div key={item.id}>
                  {![1, 9, 10, 15].includes(item.id) && (
                    <h1 className={"text-3xl mt-4 font-bold text-gray-300"}>
                      {item.attributes.name}
                    </h1>
                  )}
                  <div className={"flex flex-wrap gap-10 overflow-y-auto mt-2"}>
                    <MoveCardList keyComboList={item.keyComboList} />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>
    </>
  );
}
