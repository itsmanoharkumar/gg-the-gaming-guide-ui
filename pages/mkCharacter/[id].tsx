import {API_ROUTES} from "@/helpers/constants";
import fetcher from "@/service/service";
import qs from "qs";
import Breadcrumbs from "@/components/atoms/Breadcrumb";
import Head from "next/head";
import React, {useEffect, useState} from "react";
import MoveCardList from "@/components/molecules/MoveCardList";
import SoftTab from "@/components/atoms/SoftTab";
import {MKKeyCombo, MKKeyComboAttributes} from "@/types/mkKeyCombo";
import {MKKeyComboCategory} from "@/types/mkKeyComboCategory";
import {MKKeyComboSubcategoryAttributes} from "@/types/mkKeyComboSubcategory";
import Grid from "@mui/material/Unstable_Grid2";
import {Container, Tab, Tabs, TextField, Typography} from "@mui/material";
import Box from "@mui/material/Box";
import Breadcrumb from "@/components/atoms/Breadcrumb";

export async function getStaticProps({params}: { params: { id: number } }) {
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
    const {data} = await fetcher(
        API_ROUTES.mkCharacters + `/${params.id}?${query}`
    );
    const characterName =
        data?.attributes?.name;
    const comboData = data?.attributes?.combos?.data;

    const keyComboCategoryList = await fetcher(
        API_ROUTES.mkKeyComboCategories + `?populate=*`
    );
    const keyComboCategoryData = keyComboCategoryList?.data;

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
                const {name, combo}: MKKeyComboAttributes = attributes;
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
                        const {subcategory}: MKKeyComboAttributes = attributes;
                        return subcategory?.data?.id === item.id;
                    }),
                };
            }
        );
        setSelectedSubCategoryList(mkKeyComboSubcategories);
    }, [selectedTab]);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setSelectedTab(newValue);
    };


    return (
        <>
            <Head>
                <title>{characterName}</title>
            </Head>
            <Container maxWidth={"xl"}>
                <Box
                    sx={{
                        mr: 2,
                        my: 2,
                    }}
                >
                    <Breadcrumb
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
                </Box>
                <Box
                    sx={{
                        mr: 2,
                        mb: 2,
                    }}
                >
                    <Grid container>
                        <Grid xs={12} sm={6} lg={4}>
                            <TextField
                                label={"Search"}
                                fullWidth={true}
                                autoFocus={true}
                                value={searchTerm}
                                onChange={(event) => setSearchTerm(event.target.value)}
                            />
                        </Grid>
                    </Grid>
                </Box>
                {!searchTerm && (
                    <Tabs
                        allowScrollButtonsMobile
                        variant="scrollable"
                        scrollButtons="auto"
                        value={selectedTab}
                        onChange={handleChange}
                        sx={{
                            my: 2
                        }}
                    >
                        {tabList?.map((item: { label: string; id: number }) => {
                            return (
                                <Tab key={item.id} label={item.label} value={item.id}/>
                            );
                        })}
                    </Tabs>
                )}
                {searchTerm && <Typography>Search Result</Typography>}
                {(selectedTab === 0 || searchTerm) && (
                    <Box>
                        {!searchTerm && <MoveCardList keyComboList={keyComboList}/>}
                        {searchTerm && <MoveCardList keyComboList={filteredKeyComboList}/>}
                    </Box>
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
                                        <MoveCardList keyComboList={item.keyComboList}/>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </Container>
        </>
    );
}
