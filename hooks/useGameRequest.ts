import { handleNetworkError } from "@/helpers/helper";
import {
  createGameRequestApi,
  getAllGameRequestsApi,
  upVoteGameRequestsApi,
} from "@/service/gameRequest";
import { useSnackbar } from "notistack";
import qs from "qs";

export interface GameRequestRequestPayload {
  name: string;
}

export function useGameRequest() {
  const { enqueueSnackbar } = useSnackbar();

  async function createGameRequest({ name }: GameRequestRequestPayload) {
    try {
      if (!name) {
        enqueueSnackbar("Enter name", { variant: "warning" });
        return;
      }
      const response = await createGameRequestApi({
        name: name?.toLowerCase(),
      });
      enqueueSnackbar("Success", { variant: "success" });
      return response;
    } catch (e: any) {
      const error = handleNetworkError(e);
      enqueueSnackbar(error.message, { variant: "error" });
    }
  }

  async function getAllGameRequest() {
    const query = qs.stringify({
      sort: "updatedAt:desc",
    });
    try {
      return await getAllGameRequestsApi(query);
    } catch (e: any) {
      const error = handleNetworkError(e);
      enqueueSnackbar(error.message, { variant: "error" });
    }
  }

  async function upVoteGameRequest(id: number) {
    try {
      const response = await upVoteGameRequestsApi(id);
      enqueueSnackbar("Voted Successfully", { variant: "success" });
      return response;
    } catch (e: any) {
      const error = handleNetworkError(e);
      enqueueSnackbar(error.message, { variant: "error" });
    }
  }

  return {
    createGameRequest,
    upVoteGameRequest,
    getAllGameRequest,
  };
}
