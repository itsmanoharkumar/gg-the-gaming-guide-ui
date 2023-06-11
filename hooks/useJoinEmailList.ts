import { joinEmailListApi } from "@/service/newsletter";
import { useSnackbar } from "notistack";

export function useJoinEmailList() {
  const { enqueueSnackbar } = useSnackbar();
  async function joinEmailList(email: string) {
    try {
      const response = await joinEmailListApi(email);
      enqueueSnackbar("Subscribed", { variant: "success" });
      return response.payload;
    } catch (e: any) {
      let errorMessage = "Failed to subscribe";
      if (e.response?.status === 400) {
        console.log(e.response?.data.error.message);
        if (e.response?.data?.error?.message?.includes("must be unique")) {
          errorMessage = "Already Subscribed";
        }
        if (e.response?.data?.error?.message?.includes("must be a valid")) {
          errorMessage = "Invalid Email";
        }
      }
      if (process.env.NODE_ENV === "development") {
        enqueueSnackbar(e.response?.data?.error?.message || errorMessage, {
          variant: "error",
        });
      } else {
        enqueueSnackbar(errorMessage, { variant: "error" });
      }
    }
  }
  return {
    joinEmailList,
  };
}
