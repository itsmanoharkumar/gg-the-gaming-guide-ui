import { GameRequestRequestPayload } from "@/hooks/useGameRequest";
import { GameRequest } from "@/types/types";
import axios from "axios";

export async function createGameRequestApi(payload: GameRequestRequestPayload) {
  const response = await axios.post("/game-requests", {
    data: payload,
  });
  return response?.data;
}

export async function getAllGameRequestsApi(
  query?: string
): Promise<{ data: GameRequest[] }> {
  const response = await axios.get("/game-requests?" + query);
  return response?.data;
}

export async function upVoteGameRequestsApi(id: number): Promise<GameRequest> {
  const response = await axios.put(`/game-requests/${id}/vote`);
  return response?.data;
}
