import {API_ROUTES} from "@/helpers/constants";
import fetcher from "@/service/service";
import {MK11Ultimate, MK11UltimateAttributes} from "@/types/mk11UltimateType";
import {MKCharacter} from "@/types/mkCharacter";
import Head from "next/head";
import qs from "qs";
import CharacterList from "@/components/molecules/CharacterList";
import {useEffect, useState} from "react";
import Breadcrumbs from "@/components/atoms/Breadcrumb";
import {Button, Container, TextField, Typography} from "@mui/material";
import Box from "@mui/material/Box";
import placeholder from "lodash/fp/placeholder";
import Grid from "@mui/material/Unstable_Grid2";
import Link from "@/components/atoms/Link";

export async function getStaticProps() {
    const query = qs.stringify({
        populate: {
            characters: {
                populate: ["image"],
            },
        },
    });
    const {data} = await fetcher(API_ROUTES.mk11Ultimate + "?" + query);
    return {
        props: {
            mk11UltimateData: data,
        },
    };
}

interface Props {
    mk11UltimateData: MK11Ultimate;
}

export default function Home({mk11UltimateData}: Props) {
    const {
        name,
        characters: {data},
    }: MK11UltimateAttributes = mk11UltimateData?.attributes;
    const [searchTerm, setSearchTerm] = useState("");
    const [characterList, setCharacterList] = useState<MKCharacter[]>([]);
    const [searchResults, setSearchResults] = useState<MKCharacter[]>([]);

    useEffect(() => {
        const characterList = mk11UltimateData?.attributes.characters?.data;
        setCharacterList(characterList);
        setSearchResults(characterList);
    }, [mk11UltimateData]);


    useEffect(() => {
        const results = characterList?.filter((character) => {
            const name = character.attributes.name.toLowerCase();
            return name.includes(searchTerm.toLowerCase());
        });
        console.log(results, searchTerm);
        setSearchResults(results);
    }, [searchTerm, characterList]);

    return (
        <>
            <Head>
                <title>{name}</title>
            </Head>
            <Container maxWidth={"xl"}>
                <Box
                    sx={{
                        width: '100%',
                        my: 2,
                    }}
                >
                    <Typography
                        sx={{
                            typography: {
                                xs: "h4",
                                md: "h3",
                            },
                        }}
                        color="primary"
                        gutterBottom
                    >
                        {name}
                    </Typography>
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
                    <Box sx={{
                        width: '100%'
                    }}>
                        <CharacterList data={searchResults}/>
                    </Box>
                </Box>
            </Container>
        </>
    );
}
