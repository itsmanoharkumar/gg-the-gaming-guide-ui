import { MKKeyComboSubcategory } from "@/types/mkKeyComboSubcategory";
import { Timestamp } from "@/types/types";
import { MKFrameData } from "@/types/mkFrameData";
import { MKMoveData } from "@/types/mkMoveData";
import { MKCharacter } from "@/types/mkCharacter";

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
  character: {
    data: MKCharacter;
  };
  easyFatality: Array<{ name: string; inputCommands: string }>;
} & Timestamp;

export type MKKeyCombo = {
  id: number;
  attributes: MKKeyComboAttributes;
};
