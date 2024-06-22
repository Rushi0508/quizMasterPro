import {errorHandler} from '../utils/apiHandler';
import api from '../utils/api';
import {baseURL} from '../utils/baseUrl';

export class QuizAPI {
  static generateQuiz = errorHandler(async body => {
    return await api.post(`${baseURL}/api/quizzes/create`, body);
  });
  static submitQuiz = errorHandler(async (quizId, body) => {
    return await api.put(`${baseURL}/api/quizzes/${quizId}`, body);
  });
  static getUserQuizzes = errorHandler(async userId => {
    return await api.get(`${baseURL}/api/quizzes/user/${userId}`);
  });
  static deleteQuiz = errorHandler(async quizId => {
    return await api.delete(`${baseURL}/api/quizzes/${quizId}`);
  });
}
