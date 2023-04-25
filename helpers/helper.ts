import cookie from "cookie";

export function parseCookies(req: any) {
  return cookie.parse(req ? req.headers.cookie || "" : document.cookie);
}

export function handleNetworkError(networkError: any) {
  const networkErrorResponse = networkError.response;
  const errorData = networkErrorResponse?.data;
  const errorStatus = networkErrorResponse?.status;
  const error = new Error();
  error.stack = networkError?.stack;
  if (errorStatus === 400) {
    error.name = errorData?.error?.name;
    error.message = errorData?.error?.message;
  } else {
    error.name = networkError?.name;
    error.message = `Internal Server Error`;
    console.log(networkError);
  }
  return error;
}
