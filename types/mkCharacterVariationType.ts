import { Timestamp } from "@/types/types";
import { MKCharacter } from "@/types/mkCharacterType";
import { StrapiImageData } from "@/types/ImageDataType";
import { MKKeyCombo } from "@/types/mkKeyCombo";

export type MKCharacterVariation = {
  id: number;
  attributes: MKCharacterVariationAttributes;
};

export type MKCharacterVariationAttributes = {
  name: string;
  character: {
    data: MKCharacter;
  };
  combos: {
    data: MKKeyCombo;
  };
  image: {
    data: StrapiImageData;
  };
} & Timestamp;
