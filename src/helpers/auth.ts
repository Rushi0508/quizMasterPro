import axios from 'axios';
import {errorHandler} from '../utils/apiHandler';

export class AuthAPI {
  static login = errorHandler(async body => {
    return await axios.post(
      `https://4108-110-227-244-9.ngrok-free.app/api/users/login`,
      body,
    );
  });
  static register = errorHandler(async body => {
    return await axios.post(
      `https://68fe-2401-4900-1c80-cdea-fded-d631-4e76-2d3c.ngrok-free.app/api/users/register`,
      body,
    );
  });
}
