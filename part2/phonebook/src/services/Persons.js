import axios from 'axios';
const baseURL = 'http://localhost:3001/persons';

export const getAll = () => {
  const req = axios.get(baseURL);
  return req.then(resp => resp.data);
};

export const add = personObject => {
  const req = axios.post(baseURL, personObject);
  return req.then(resp => resp.data);
};
