import React from "react";
import axios from "axios";
import { handleError, handleResponse } from "./responseApiCall";

const baseURL = "https://api.coingecko.com/api/v3/";

const getAll = async (
  additionalURL: string
): Promise<object | Array<object> | any> => {
  try {
    const response = await axios.get(baseURL + additionalURL);
    const responseData = handleResponse(response);
    console.log(responseData);
    return responseData;
  } catch (error) {
    handleError(error);
  }
};

export default { getAll };
