import { MOVE_TYPE } from "@/types/enums";

export type MKMoveData = {
  id: number;
  blockDamage: number;
  damage: number;
  fBlockDamage: number;
  moveType: MOVE_TYPE;
  specialNotes: string;
  notes: string;
};
