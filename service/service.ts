import { handleNetworkError } from "@/helpers/helper";
import axios from "axios";

export default async function fetcher(url: string) {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (e) {
    throw handleNetworkError(e);
  }
}
