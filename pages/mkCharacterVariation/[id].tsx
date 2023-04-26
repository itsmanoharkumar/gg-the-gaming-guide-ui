import { API_ROUTES } from "@/helpers/constants";
import fetcher from "@/service/service";
import { MKKeyCombo, MKKeyComboAttributes } from "@/types/types";
import { divide } from "lodash";
import qs from "qs";

export async function getStaticProps({ params }: { params: { id: number } }) {
  const query = qs.stringify({
    populate: {
      mk_key_combos: {
        populate: ["frameData", "moveData", "mk_key_combo_subcategory"],
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
  return (
    <main className={`min-h-screen p-4 mt-10 select-none`}>
      {characterName && (
        <div className={"p-2 flex justify-start items-center"}>
          {`${variationName} (${characterName})`}
        </div>
      )}
      <div className={"my-1"}>
        {keyComboList?.map((item: any) => {
          const attributes = item?.attributes;
          const {
            name,
            inputCommands,
            frameData: {
              active,
              startUp,
              recovery,
              cancel,
              hitAdv,
              blockAdv,
              fBlockAdv,
            },
            moveData: {
              blockDamage,
              damage,
              fBlockDamage,
              moveType,
              specialNotes,
              notes,
            },
            hasAmplify,
            isEquipped,
            isCancellable,
            easyFatality,
          }: MKKeyComboAttributes = attributes;
          return (
            <div
              key={item.id}
              className={"border-[1px] border-gray-400 p-2 my-2 rounded"}
            >
              <div className={"flex justify-between"}>
                <div>{name}</div>
                <div className={"no-wrap"}>{inputCommands}</div>
              </div>
              <div>
                <div>{startUp + " Start Up"}</div>
                <div>{active + " Active"}</div>
                <div>{recovery + " Recovery"}</div>
                <div>{cancel + " Cancel"}</div>
                <div>{hitAdv + " Hit Advantage"}</div>
                <div>{blockAdv + " Block Advantage"}</div>
                <div>{fBlockAdv + " F/Block Advantage"}</div>
                <div>{fBlockAdv + " F/Block Advantage"}</div>
              </div>
              <div>
                <div>{blockDamage + " Block Damage"}</div>
                <div>{damage + " Damage"}</div>
                <div>{fBlockDamage + " F/Block Damage"}</div>
                <div>{moveType + " Move Type"}</div>
                <div>{specialNotes}</div>
                <div>{notes}</div>
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
}
