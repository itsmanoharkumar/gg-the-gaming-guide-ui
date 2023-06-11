import { ConnectWithUsRequestPayload } from "@/hooks/useLead";
import axios from "axios";

export async function saveLeadApi(payload: ConnectWithUsRequestPayload) {
  const response = await axios.post("/leads", {
    data: payload,
  });
  return response.data;
}
