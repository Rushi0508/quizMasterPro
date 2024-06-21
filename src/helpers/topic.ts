import axios from 'axios';
import {errorHandler} from '../utils/apiHandler';
import api from '../utils/api';

export class TopicAPI {
  static getAllTopics = errorHandler(async () => {
    return await api.get(
      `https://7325-2401-4900-1c80-cdea-fded-d631-4e76-2d3c.ngrok-free.app/api/topics`,
    );
  });
}
