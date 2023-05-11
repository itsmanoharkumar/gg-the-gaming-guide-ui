import { MKKeyCombo, Timestamp } from "@/types/types";
import { MKKeyComboCategory } from "@/types/mkKeyComboCategory";

export type MKKeyComboSubcategory = {
  id: number;
  attributes: MKKeyComboSubcategoryAttributes;
};

export type MKKeyComboSubcategoryAttributes = {
  name: string;
  category: MKKeyComboCategory;
  combos: MKKeyCombo[];
} & Timestamp;
