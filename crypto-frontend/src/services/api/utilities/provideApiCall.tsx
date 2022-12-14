import axios from "axios";
import { handleError, handleResponse } from "./responses";
import logger from "../../logger";

const baseURL = "https://api.coingecko.com/api/v3/";

interface apiInformation extends Object {
  data: any;
}

const callApiInfo = async (apiUrl: string): Promise<any> => {
  try {
    const response = await axios.post(
      process.env.REACT_APP_API_ENDPOINT! + "api/coininfo/",
      {
        url: apiUrl,
      }
    );
    return response;
  } catch (err) {
    return (err as Error).message;
  }
};

const getAll = async (
  additionalURL: string
): Promise<object | Array<object> | any> => {
  try {
    const response = await axios.get(baseURL + additionalURL);
    const responseData = handleResponse(response);
    logger.info(responseData);
    return responseData;
  } catch (error) {
    handleError(error);
  }
};

const getMarketData = async (
  marketDataURL: string
): Promise<object | Array<object> | any> => {
  try {
    const response = await axios.get(
      baseURL + "coins/markets/" + marketDataURL
    );
    const responseData = handleError(response);
    return responseData;
  } catch (error) {
    handleError(error);
  }
};

export default {
  getAll,
  getMarketData,
  callApiInfo,
};
