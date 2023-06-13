import GameCard from "@/components/atoms/GameCard";
import {API_ROUTES} from "@/helpers/constants";
import fetcher from "@/service/service";
import {MK11Ultimate} from "@/types/mk11UltimateType";
import Head from "next/head";
import {Container, Typography} from "@mui/material";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";

export async function getStaticProps() {
    const {data} = await fetcher(API_ROUTES.mk11Ultimate + "?populate=banner");
    return {
        props: {
            mk11UltimateData: data,
        }, // will be passed to the page component as props
    };
}

export default function Home({
                                 mk11UltimateData,
                             }: {
    mk11UltimateData: MK11Ultimate;
}) {
    const {
        name,
        banner: {data},
    } = mk11UltimateData?.attributes;
    return (
        <>
            <Head>
                <title>GG The Gaming Guide</title>
            </Head>
            <Container maxWidth={"xl"}>
                <Box
                    sx={{
                        my: 4,
                    }}
                >
                    <Typography
                        variant="h5"
                        component="h3"
                        gutterBottom
                        sx={{
                            my: 10,
                            lineHeight: {
                                xs: 1,
                                sm: 1.2,
                                md: 1.5,
                                lg: 1.8,
                                xl: 2,
                            },
                        }}
                    >

            <span> Unlock Your Gaming Potential with </span>
                        <Typography
                            variant="h5"
                            component="span"
                            sx={{
                                lineHeight: {
                                    xs: 1,
                                    sm: 1.2,
                                    md: 1.5,
                                    lg: 1.8,
                                    xl: 2,
                                },
                            }}
                  className={
                      "text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600"
                  }
              >
              <span>  GG: The Ultimate Gaming Guide!  </span>
            </Typography>
              Level up your skills, discover insider tips, and explore the latest trends in the world of gaming.
              From comprehensive game reviews to expert strategies, GG is your go-to resource for all things gaming.
              Get ready to dominate the virtual realm and achieve gaming greatness with GG!
                    </Typography>
                    <Box>
                        <Grid container spacing={2} alignItems={"baseline"}>
                            <Grid xs={12} sm={6} md={4} lg={3}>
                                <GameCard gameName={name} banner={data}/>
                            </Grid>
                        </Grid>
                    </Box>

                </Box>
            </Container>
        </>
    );
}
