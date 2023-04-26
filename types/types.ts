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

export const enum OPERATING_SYSTEM {
  MAC = "mac",
  WINDOWS = "windows",
}

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

export enum MOVE_TYPE {
  High = "High",
  Mid = "Mid",
  Low = "Low",
  Overhead = "Overhead",
  Throw = "Throw",
}

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

export type MK11UltimateAttributes = {
  name: string;
  mk_characters: {
    data: MKCharacter[];
  };
} & Timestamp;

export type MK11Ultimate = {
  id: number;
  attributes: MK11UltimateAttributes;
};

export type ImageData = {
  id: number;
  attributes: ImageAttributes;
};

export type ImageAttributes = {
  name: string;
  alternativeText: null | string;
  caption: null | string;
  width: number;
  height: number;
  formats: {
    large: {
      ext: string;
      url: string;
      hash: string;
      mime: string;
      name: string;
      path: null | string;
      size: number;
      width: number;
      height: number;
    };
    small: {
      ext: string;
      url: string;
      hash: string;
      mime: string;
      name: string;
      path: null | string;
      size: number;
      width: number;
      height: number;
    };
    medium: {
      ext: string;
      url: string;
      hash: string;
      mime: string;
      name: string;
      path: null | string;
      size: number;
      width: number;
      height: number;
    };
    thumbnail: {
      ext: string;
      url: string;
      hash: string;
      mime: string;
      name: string;
      path: null | string;
      size: number;
      width: number;
      height: number;
    };
  };
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl: null | string;
  provider: string;
  provider_metadata: null | object;
  createdAt: string;
  updatedAt: string;
};
