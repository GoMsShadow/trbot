import axios from "axios";

export const apiGetParams = async () => {
  return await axios.get("/api/getparams");
};

export const apiSetParams = async (data) => {
  return await axios.post("/api/setparams", data);
};

export const apiQueryOrder = async (data) => {
  return await axios.post("/api/queryOrder", data);
};

export const apiCancelOrder = async (data) => {
  return await axios.post("/api/cancelOrder", data);
};

export const apiCancelAllOpenOrders = async () => {
  return await axios.get("/api/cancelAllOpenOrders");
};

export const apiLoadAllOrders = async () => {
  return await axios.get("/api/loadAllOrders");
};
