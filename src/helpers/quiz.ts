import {errorHandler} from '../utils/apiHandler';
import api from '../utils/api';

export class QuizAPI {
  static generateQuiz = errorHandler(async body => {
    return await api.post(
      `https://7325-2401-4900-1c80-cdea-fded-d631-4e76-2d3c.ngrok-free.app/api/quizzes/create`,
      body,
    );
  });
  static submitQuiz = errorHandler(async (quizId, body) => {
    return await api.put(
      `https://7325-2401-4900-1c80-cdea-fded-d631-4e76-2d3c.ngrok-free.app/api/quizzes/${quizId}`,
      body,
    );
  });
}
