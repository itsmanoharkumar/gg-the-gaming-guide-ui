import { API_ROUTES } from "@/helpers/constants";
import { handleNetworkError } from "@/helpers/helper";
import axios, { AxiosResponse } from "axios";

interface RegisterRequestPayload {
  email: string;
  username: string;
  password: string;
}

interface LoginRequestPayload {
  identifier: string;
  password: string;
}

export async function register(payload: RegisterRequestPayload) {
  try {
    const response: AxiosResponse = await axios.post(
      API_ROUTES.register,
      payload
    );
    return response.data;
  } catch (e: any) {
    throw handleNetworkError(e);
  }
}

export async function login(payload: LoginRequestPayload) {
  try {
    const response: AxiosResponse = await axios.post(API_ROUTES.login, payload);
    return response.data;
  } catch (e: any) {
    throw handleNetworkError(e);
  }
}

export async function getCurrentUser() {
  try {
    const response: AxiosResponse = await axios.get(API_ROUTES.me);
    return response.data;
  } catch (e: any) {
    throw handleNetworkError(e);
  }
}
