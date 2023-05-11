import { StrapiImageData } from "@/types/ImageDataType";
import { MKCharacter } from "@/types/mkCharacterType";
import { Timestamp } from "@/types/types";

export type MK11UltimateAttributes = {
  name: string;
  characters: {
    data: MKCharacter[];
  };
  banner: {
    data: StrapiImageData;
  };
} & Timestamp;

export type MK11Ultimate = {
  id: number;
  attributes: MK11UltimateAttributes;
};
