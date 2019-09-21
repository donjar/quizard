import { IQuizCreateApi } from './interfaces/quiz-create/index';

const apiUrl = 'http://165.22.54.169';

export const login = async (email: string, password: string) => {
  const res = await fetch(`${apiUrl}/login`, {
    method: 'POST',
    body: JSON.stringify({email, password})
  });

  return await res.json();
};

export const register = async (fullName: string, email: string, password: string) => {
  const res = await fetch(`${apiUrl}/users`, {
    method: 'POST',
    body: JSON.stringify({email, password, full_name: fullName})
  });

  return await res.json();
};

export const createQuiz = async (values: IQuizCreateApi) => {
  const token = localStorage.getItem('accessToken');

  const res = await fetch(`${apiUrl}/quizzes`, {
    method: 'POST',
    body: JSON.stringify(values),
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  return await res.json();
};

export const getAllQuizzes = async () => {
  const token = localStorage.getItem('accessToken');

  const res = await fetch(`${apiUrl}/quizzes`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  return await res.json();
};

export const getQuizById = async (quizId: string) => {
  const token = localStorage.getItem('accessToken');

  const res = await fetch(`${apiUrl}/quizzes/${quizId}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  return await res.json();
};

export const getQuestionsByQuizId = async (quizId: string) => {
  const token = localStorage.getItem('accessToken');

  const res = await fetch(`${apiUrl}/quizzes/${quizId}/questions`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  return await res.json();
};
