import { MOVE_TYPE } from "@/types/enums";
import { MKCharacter } from "@/types/mkCharacter";
import { MKKeyComboSubcategory } from "@/types/mkKeyComboSubcategory";
import { MKKeyComboAttributes } from "@/types/mkKeyCombo";

export type Timestamp = {
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
};

export const enum THEME_MODE {
  LIGHT = "light",
  DARK = "dark",
}

export type GameRequest = {
  id: number;
  attributes: GameRequestAttributes;
};

export type GameRequestAttributes = {
  name: string;
} & Timestamp;

export type StrapiImageData = {
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
