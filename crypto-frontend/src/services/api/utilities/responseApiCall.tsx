import React from "react";

const handleResponse = (response: any): any => {
  if (response.data) {
    return response.data;
  }
};

const handleError = (error: any): any => {
  if (error.data) {
    return error.data;
  }
  return error;
};

export { handleResponse, handleError };
