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

export type ProductAttributes = {
  name: string;
  logo: {
    data: ImageData;
  }
} & Timestamp;

export type Product = {
  id: number;
  attributes: ProductAttributes;
};

export type ImageData = {
  id: number;
  attributes: ImageAttributes;
}

export type ImageAttributes ={
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
}
