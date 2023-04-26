import { MKCharacterVariation, Timestamp } from "@/types/types";

export type MKCharacterAttributes = {
  name: string;
  mk_character_variations: {
    data: MKCharacterVariation[];
  };
} & Timestamp;

export type MKCharacter = {
  id: number;
  attributes: MKCharacterAttributes;
};
