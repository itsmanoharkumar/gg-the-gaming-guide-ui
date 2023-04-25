import { API_ROUTES } from "@/helpers/constants";
import fetcher from "@/service/service";
import Image from "next/image";
import { useRouter } from "next/router";
// import { Inter } from "next/font/google";

// const inter = Inter({ subsets: ["latin"] });

export async function getStaticProps({ params }: { params: any }) {
  const { data } = await fetcher(
    API_ROUTES.mkCharacterVariations +
      `?filters[mk_character][id][$eq]=${params.id}&populate=*`
  );
  return {
    props: {
      characterVariationList: data,
    }, // will be passed to the page component as props
  };
}

export async function getStaticPaths() {
  const mk11UltimateData = await fetcher(
    API_ROUTES.mk11Ultimate + "?populate=*"
  );
  const characterData = mk11UltimateData?.data?.attributes?.mk_characters?.data;
  const paths = characterData?.map((item: any) => ({
    params: { id: String(item.id) },
  }));
  return {
    paths,
    fallback: false, // can also be true or 'blocking'
  };
}

export default function Home({
  characterVariationList,
}: {
  characterVariationList: any;
}) {
  console.log(characterVariationList);
  const name = characterVariationList?.attributes?.name;
  const navigate = useRouter();

  function handleOnClick() {
    navigate.push("/mk11Ultimate");
  }

  return (
    <main className={`min-h-screen p-4 mt-10 select-none`}>
      {name && (
        <div
          className={
            "p-2 rounded border-[1px] border-gray-500 cursor-pointer max-w-[250px] flex justify-center items-center"
          }
          onClick={handleOnClick}
        >
          test
        </div>
      )}
    </main>
  );
}
