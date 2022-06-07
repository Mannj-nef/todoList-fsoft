import axios from "axios";

export const getApi = async (url) => {
  const respones = await axios.get(url);
  return respones.data;
};

export const postApi = async (url, value) => {
  const respones = await axios.post(url, value);
  return respones.data;
};

export const putApi = async (url, id, value) => {
  const respones = await axios.put(`${url}/${id}`, value);
  return respones.data;
};

export const deleteApi = async (url, id) => {
  const respones = await axios.delete(`${url}/${id}`);
  return respones.data;
};
