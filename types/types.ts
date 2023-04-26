import { MOVE_TYPE } from "@/types/enums";
import { MKCharacter } from "@/types/mkCharacterType";

export type Timestamp = {
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
};

export type ShortcutAttributes = {
  shortText: string;
  windowsKeyCombo: string;
  macKeyCombo: string;
} & Timestamp;

export type Shortcut = {
  id: number;
  attributes: ShortcutAttributes;
};

export type ShortcutCategoryAttributes = {
  name: string;
  shortcuts?: {
    data: Array<Shortcut>;
  };
} & Timestamp;

export type ShortcutCategory = {
  id: number;
  attributes: ShortcutCategoryAttributes;
};

export type MKCharacterVariationAttributes = {
  name: string;
  mk_character: {
    data: MKCharacter;
  };
  mk_key_combos: {
    data: MKKeyCombo;
  };
} & Timestamp;

export type MKKeyComboAttributes = {
  name: string;
  inputCommands: string;
  hasAmplify: boolean;
  isEquipped: boolean;
  isCancellable: boolean;
  frameData: MKFrameData;
  moveData: MKMoveData;
  mk_key_combo_subcategory: {
    data: MKKeyComboSubcategory;
  };
  mk_character_variation: {
    data: MKCharacterVariation;
  };
  easyFatality: Array<{ name: string; inputCommands: string }>;
} & Timestamp;

export type MKKeyComboCategory = {
  id: number;
  attributes: MKKeyComboCategoryAttributes;
};

export type MKKeyComboCategoryAttributes = {
  name: string;
  mk_key_combo_subcategories: {
    data: MKKeyComboSubcategory;
  };
} & Timestamp;

export type MKKeyComboSubcategory = {
  id: number;
  attributes: MKKeyComboSubcategoryAttributes;
};

export type MKKeyComboSubcategoryAttributes = {
  name: string;
} & Timestamp;

export type MKFrameData = {
  id: number;
  startUp: number;
  active: number;
  recovery: number;
  cancel: number;
  hitAdv: number;
  blockAdv: number;
  fBlockAdv: number;
};

export type MKMoveData = {
  id: number;
  blockDamage: number;
  damage: number;
  fBlockDamage: number;
  moveType: MOVE_TYPE;
  specialNotes: string;
  notes: string;
};

export type MKKeyCombo = {
  id: number;
  attributes: MKKeyComboAttributes;
};

export type MKCharacterVariation = {
  id: number;
  attributes: MKCharacterVariationAttributes;
};
