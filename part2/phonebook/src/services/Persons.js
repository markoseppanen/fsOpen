import axios from 'axios';
const baseURL = 'http://localhost:3001/persons';

export const getAllPersons = () => {
  const req = axios.get(baseURL);
  return req.then(resp => resp.data);
};

export const addPerson = personObject => {
  const req = axios.post(baseURL, personObject);
  return req.then(resp => resp.data);
};

export const deletePerson = id => {
  const req = axios.delete(`${baseURL}/${id}`);
  return req.then(resp => resp.data);
};
