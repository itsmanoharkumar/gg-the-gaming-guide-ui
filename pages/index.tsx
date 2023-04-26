import { API_ROUTES } from "@/helpers/constants";
import fetcher from "@/service/service";
import { MK11Ultimate } from "@/types/types";
import Image from "next/image";
import { useRouter } from "next/router";
// import { Inter } from "next/font/google";

// const inter = Inter({ subsets: ["latin"] });

export async function getStaticProps() {
  const { data } = await fetcher(API_ROUTES.mk11Ultimate);
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
  console.log(mk11UltimateData);
  const name = mk11UltimateData?.attributes?.name;
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
          {name}
        </div>
      )}
    </main>
  );
}
