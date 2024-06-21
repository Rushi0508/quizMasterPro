import axios from 'axios';
import {errorHandler} from '../utils/apiHandler';
import api from '../utils/api';
import {baseURL} from '../utils/baseUrl';

export class AuthAPI {
  static login = errorHandler(async body => {
    return await axios.post(`${baseURL}/api/users/login`, body);
  });
  static register = errorHandler(async body => {
    return await axios.post(`${baseURL}/api/users/register`, body);
  });
  static delete = errorHandler(async userId => {
    return await api.delete(`${baseURL}/api/users/${userId}`);
  });
  static getUser = errorHandler(async userId => {
    return await api.get(`${baseURL}/api/users/${userId}`);
  });
}
