import { Timestamp } from "@/types/types";
import { MKKeyComboSubcategory } from "@/types/mkKeyComboSubcategory";

export type MKKeyComboCategory = {
  id: number;
  attributes: MKKeyComboCategoryAttributes;
};

export type MKKeyComboCategoryAttributes = {
  name: string;
  subcategories: {
    data: MKKeyComboSubcategory[];
  };
} & Timestamp;
