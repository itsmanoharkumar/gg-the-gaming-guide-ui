import GameCard from "@/components/GameCard";
import { API_ROUTES } from "@/helpers/constants";
import fetcher from "@/service/service";
import { MK11Ultimate } from "@/types/mk11UltimateType";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { getYoutubePlaylistApi } from "@/service/youtube";

export async function getStaticProps() {
  const { data } = await fetcher(API_ROUTES.mk11Ultimate + "?populate=banner");
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
    banner: { data },
  } = mk11UltimateData?.attributes;
  return (
    <>
      <Head>
        <title>GG The Gaming Guide</title>
      </Head>
      <main className={`min-h-screen p-4 pt-14 select-none`}>
        <GameCard gameName={name} banner={data} />
      </main>
    </>
  );
}
