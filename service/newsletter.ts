import axios from "axios";

export async function joinEmailListApi(email: string) {
  const response = await axios.post("/email-lists", {
    data: {
      email,
    },
  });
  return response.data;
}
