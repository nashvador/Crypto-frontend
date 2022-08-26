import axios from "axios";
import { handleError, handleResponse } from "./responses";
import logger from "../../logger";

const baseURL = "https://api.coingecko.com/api/v3/";

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

const getCoinsData = async (
  coinDataURL: string
): Promise<object | Array<object> | any> => {
  try {
    const response = await axios.get(baseURL + "coins/" + coinDataURL);
    const responseData = handleError(response);
    return responseData;
  } catch (error) {
    handleError(error);
  }
};

const getCoinsSearchData = async (
  coinDataURL: string
): Promise<object | Array<object> | any> => {
  try {
    const response = await axios.get(baseURL + "search/" + coinDataURL);
    const responseData = handleError(response);
    return responseData;
  } catch (error) {
    handleError(error);
  }
};

export default { getAll, getMarketData, getCoinsData, getCoinsSearchData };
