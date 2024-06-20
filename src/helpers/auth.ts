import axios from 'axios';
import {errorHandler} from '../utils/apiHandler';

export class AuthAPI {
  static login = errorHandler(async body => {
    return await axios.post(
      `https://4108-110-227-244-9.ngrok-free.app/api/users/login`,
      body,
    );
  });
}
