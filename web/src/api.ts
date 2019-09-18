import { IQuizCreateApi } from './interfaces/quiz-create/index';

const apiUrl = 'http://165.22.54.169';

export const login = async (email: string, password: string) => {
  const res = await fetch(`${apiUrl}/login`, {
    method: 'POST',
    body: JSON.stringify({email, password})
  });

  return await res.json();
};

export const createQuiz = async (values: IQuizCreateApi) => {
  const token = localStorage.getItem('accessToken');

  const res = await fetch(`${apiUrl}/quizzes`, {
    method: 'POST',
    body: JSON.stringify(values),
    headers: {
      'Authentication': `Bearer ${token}`
    }
  });

  return await res.json();
};
