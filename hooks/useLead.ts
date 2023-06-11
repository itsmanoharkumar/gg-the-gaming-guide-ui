import { saveLeadApi } from "@/service/lead";
import { useSnackbar } from "notistack";

export interface ConnectWithUsRequestPayload {
  email: string;
  name: string;
  message: string;
}

export function useLead() {
  const { enqueueSnackbar } = useSnackbar();

  async function saveLead({
    email,
    name,
    message,
  }: ConnectWithUsRequestPayload) {
    try {
      if (!email) {
        enqueueSnackbar("Enter email", {
          variant: "warning",
        });
        return;
      }
      if (!name) {
        enqueueSnackbar("Enter name", { variant: "warning" });
        return;
      }
      if (!message) {
        enqueueSnackbar("Enter message", { variant: "warning" });
        return;
      }
      const response = await saveLeadApi({ email, name, message });
      enqueueSnackbar("Success", { variant: "success" });
      return response;
    } catch (e: any) {
      let errorMessage = "Please try again later";
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
    saveLead: saveLead,
  };
}
