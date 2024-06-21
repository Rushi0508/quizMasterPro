import axios from 'axios';
import {errorHandler} from '../utils/apiHandler';
import api from '../utils/api';
import {baseURL} from '../utils/baseUrl';

export class TopicAPI {
  static getAllTopics = errorHandler(async () => {
    return await api.get(`${baseURL}/api/topics`);
  });
  static createTopic = errorHandler(async body => {
    return await api.post(`${baseURL}/api/topics`, body);
  });
}
