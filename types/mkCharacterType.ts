import { Timestamp } from "@/types/types";
import { MKCharacterVariation } from "@/types/mkCharacterVariationType";

export type MKCharacterAttributes = {
  name: string;
  variations: {
    data: MKCharacterVariation[];
  };
} & Timestamp;

export type MKCharacter = {
  id: number;
  attributes: MKCharacterAttributes;
};
