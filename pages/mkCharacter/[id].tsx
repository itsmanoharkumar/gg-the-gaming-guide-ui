import { API_ROUTES } from "@/helpers/constants";
import fetcher from "@/service/service";
import qs from "qs";
import Breadcrumbs from "@/components/atoms/Breadcrumbs";
import Head from "next/head";
import { useEffect, useState } from "react";
import MoveCardList from "@/components/molecules/MoveCardList";
import SoftTab from "@/components/atoms/SoftTab";
import { MKKeyCombo, MKKeyComboAttributes } from "@/types/mkKeyCombo";
import { MKKeyComboCategory } from "@/types/mkKeyComboCategory";
import { MKKeyComboSubcategoryAttributes } from "@/types/mkKeyComboSubcategory";

export async function getStaticProps({ params }: { params: { id: number } }) {
  const query = qs.stringify({
    populate: {
      combos: {
        populate: ["frameData", "moveData", "subcategory"],
        sort: ["moveData.damage:desc"],
      },
      character: {
        populate: "*",
      },
    },
  });
  const { data } = await fetcher(
    API_ROUTES.mkCharacters + `/${params.id}?${query}`
  );
  const characterName =
    data?.attributes?.name;
  const comboData = data?.attributes?.combos?.data;

  const keyComboCategoryList = await fetcher(
    API_ROUTES.mkKeyComboCategories + `?populate=*`
  );
  const keyComboCategoryData = keyComboCategoryList?.data;
  debugger;

  return {
    props: {
      keyComboList: comboData,
      characterName,
      keyComboCategoryData,
      mkCharacterData: data,
    }, // will be passed to the page component as props
  };
}

export async function getStaticPaths() {
  const mkCharacters = await fetcher(API_ROUTES.mkCharacters);
  const characterData = mkCharacters?.data;
  const paths = characterData?.map((item: any) => ({
    params: {
      id: String(item.id),
    },
  }));
  return {
    paths,
    fallback: true, // can also be true or 'blocking'
  };
}

export default function Home({
  keyComboList,
  characterName,
  keyComboCategoryData,
}: {
  mkCharacterData: any;
  keyComboList: MKKeyCombo[];
  characterName: string;
  keyComboCategoryData: MKKeyComboCategory[];
}) {
  console.log(keyComboCategoryData);
  console.log(keyComboList);
  console.log(characterName);
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
        const { name, combo }: MKKeyComboAttributes = attributes;
        return (
          name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          combo.toLowerCase().includes(searchTerm.toLowerCase())
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
  }, [keyComboCategoryData]);

  useEffect(() => {
    const selectedKeyComboCategoryData = keyComboCategoryData?.find(
      (category) => {
        return category.id === selectedTab;
      }
    );
    const selectedKeyComboSubCategoryDataList =
      selectedKeyComboCategoryData?.attributes.subcategories.data;
    const mkKeyComboSubcategories = selectedKeyComboSubCategoryDataList?.map(
      (item) => {
        return {
          ...item,
          keyComboList: keyComboList?.filter((keyCombo) => {
            const attributes = keyCombo?.attributes;
            const { subcategory }: MKKeyComboAttributes = attributes;
            return subcategory?.data?.id === item.id;
          }),
        };
      }
    );
    setSelectedSubCategoryList(mkKeyComboSubcategories);
  }, [selectedTab]);

  return (
    <>
      <Head>
        <title>{characterName}</title>
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
