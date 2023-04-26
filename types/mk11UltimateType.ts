import { ImageData } from "@/types/ImageDataType";
import { MKCharacter, Timestamp } from "@/types/types";

export type MK11UltimateAttributes = {
  name: string;
  mk_characters: {
    data: MKCharacter[];
  };
  banner: {
    data: ImageData;
  };
} & Timestamp;

export type MK11Ultimate = {
  id: number;
  attributes: MK11UltimateAttributes;
};
