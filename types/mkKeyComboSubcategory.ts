import { Timestamp } from "@/types/types";
import { MKKeyComboCategory } from "@/types/mkKeyComboCategory";
import { MKKeyCombo } from "@/types/mkKeyCombo";

export type MKKeyComboSubcategory = {
  id: number;
  attributes: MKKeyComboSubcategoryAttributes;
};

export type MKKeyComboSubcategoryAttributes = {
  name: string;
  category: MKKeyComboCategory;
  combos: MKKeyCombo[];
} & Timestamp;
