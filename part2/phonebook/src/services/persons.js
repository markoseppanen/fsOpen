import axios from "axios";

const baseUrl = "/api/persons";

export const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

export const add = (newPerson) => {
  const request = axios.post(baseUrl, newPerson);
  return request.then((response) => response.data);
};

export const remove = (id) => {
  const request = axios.delete(`${baseUrl}/${id}`);
  return request.then((response) => response.data);
};

export const update = (id, updatedPerson) => {
  const request = axios.put(`${baseUrl}/${id}`, updatedPerson);
  return request.then((response) => response.data);
};
