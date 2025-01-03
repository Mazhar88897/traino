import axios from "axios";
import toast from "react-hot-toast";
import { Logout } from "../hooks/globalFunction";

export const customAxios = async (
  dispatch,
  navigate,
  url,
  method,
  data = null,
  token = null,
  customHeader = {}
) => {
  console.log("working");
  let options = {
    method: method,
    url: `${process.env.REACT_APP_BASE_URL}${url}`,
    Headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    headers: {
      Authorization: `JWT ${token}`,
      ...customHeader,
    },
  };

  if (data) {
    options.data = data;
  }

  if (!token) {
    delete options.headers.Authorization;
  }

  try {
    const res = await axios(options);
    return res;
  } catch (error) {
    if (error?.response?.status === 401) {
      Logout(dispatch, navigate);
      toast.error(
        error?.response?.data?.error ||
          error?.response?.data?.detail ||
          error?.response?.data?.Unauthorized ||
          "You are not authorized !"
      );
    } else {
      throw error;
    }
  }
};
