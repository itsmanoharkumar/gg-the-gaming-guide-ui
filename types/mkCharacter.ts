import { Timestamp } from "@/types/types";
import {StrapiImageData} from "@/types/ImageDataType";

export type MKCharacterAttributes = {
  name: string;
  image: {
    data: StrapiImageData;
  }
} & Timestamp;

export type MKCharacter = {
  id: number;
  attributes: MKCharacterAttributes;
};
