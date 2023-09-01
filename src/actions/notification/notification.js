import axios from "axios";

const baseURL = "https://cloud-api.adroit-vantage.com/dev/aim/notification";

export const createTemplate = (payload) => {
  return axios({
    method: "POST",
    url: baseURL,
    data: payload,
  })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error.response;
    });
};

export const getAllTemplates = (channelId) => {
  return axios({
    method: "GET",
    url: baseURL,
    params: {
      requestType: "get-all-templates",
      channelId: channelId,
    },
  })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error.response;
    });
};
