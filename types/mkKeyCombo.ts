import { MKKeyComboSubcategory } from "@/types/mkKeyComboSubcategory";
import { Timestamp } from "@/types/types";
import { MKCharacterVariation } from "@/types/mkCharacterVariationType";
import { MKFrameData } from "@/types/mkFrameData";
import { MKMoveData } from "@/types/mkMoveData";

export type MKKeyComboAttributes = {
  name: string;
  combo: string;
  hasAmplify: boolean;
  isEquipped: boolean;
  isCancellable: boolean;
  frameData: MKFrameData;
  moveData: MKMoveData;
  subcategory: {
    data: MKKeyComboSubcategory;
  };
  character_variation: {
    data: MKCharacterVariation;
  };
  easyFatality: Array<{ name: string; inputCommands: string }>;
} & Timestamp;

export type MKKeyCombo = {
  id: number;
  attributes: MKKeyComboAttributes;
};
