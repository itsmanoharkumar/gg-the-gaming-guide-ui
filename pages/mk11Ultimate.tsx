import { API_ROUTES } from "@/helpers/constants";
import fetcher from "@/service/service";
import { divide } from "lodash";
import Image from "next/image";
import { Inter } from "next/font/google";
import { useRouter } from "next/router";

const inter = Inter({ subsets: ["latin"] });

export async function getStaticProps() {
  const { data } = await fetcher(API_ROUTES.mk11Ultimate + "?populate=*");
  return {
    props: {
      mk11UltimateData: data,
    }, // will be passed to the page component as props
  };
}

export default function Home({ mk11UltimateData }: { mk11UltimateData: any }) {
  console.log(mk11UltimateData);
  const name = mk11UltimateData?.attributes?.name;
  const characters = mk11UltimateData?.attributes?.mk_characters?.data;
  const hasCharacters = characters?.length > 0;
  const navigate = useRouter();
  function handleCharacterClick(id: number) {
    navigate.push("/mkCharacter/" + id);
  }
  return (
    <main className={`min-h-screen p-4 mt-10 select-none ${inter.className}`}>
      {name && <div className={"p-2 text-xl text-center"}>{name}</div>}
      {hasCharacters && (
        <div className={"rounded p-2 flex flex-wrap justify-start"}>
          {characters.map((character: any) => {
            return (
              <div
                key={character.id}
                className={
                  "p-2 flex justify-start border-gray-500 border-[1px]" +
                  " items-center w-[300] rounded cursor-pointer"
                }
                onClick={() => {
                  handleCharacterClick(character.id);
                }}
              >
                {character?.attributes?.name}
              </div>
            );
          })}
        </div>
      )}
    </main>
  );
}
