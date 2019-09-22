import { IQuizCreateApi } from './interfaces/quiz-create/index';

const apiUrl = 'http://165.22.54.169';

export const renewTokenOnExpire = async (res: Response) => {
  if (res.status === 401) {
    const data = (await res.json()).msg;
    if (data === 'Token has expired') {
      const token = (await refresh()).access_token;
      localStorage.setItem('accessToken', token);
      return true;
    }
  }
  return false;
};

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

export const refresh = async () => {
  const refreshToken = localStorage.getItem('refreshToken');

  const res = await fetch(`${apiUrl}/refresh`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${refreshToken}`
    }
  });

  return await res.json();
};

export const createQuiz = async (values: IQuizCreateApi): Promise<any> => {
  const token = localStorage.getItem('accessToken');

  const res = await fetch(`${apiUrl}/quizzes`, {
    method: 'POST',
    body: JSON.stringify(values),
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  if (await renewTokenOnExpire(res)) {
    return createQuiz(values);
  }

  return await res.json();
};

export const getAllQuizzes = async (): Promise<any> => {
  const token = localStorage.getItem('accessToken');

  const res = await fetch(`${apiUrl}/quizzes`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  if (await renewTokenOnExpire(res)) {
    return getAllQuizzes();
  }

  return await res.json();
};

export const getQuizById = async (quizId: string): Promise<any> => {
  const token = localStorage.getItem('accessToken');

  const res = await fetch(`${apiUrl}/quizzes/${quizId}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  if (await renewTokenOnExpire(res)) {
    return getQuizById(quizId);
  }

  return await res.json();
};

export const getUserCreatedQuizzes = async (userId: string): Promise<any> => {
  const token = localStorage.getItem('accessToken');

  const res = await fetch(`${apiUrl}/users/${userId}/quizzes?created=True&attempted=False`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  if (await renewTokenOnExpire(res)) {
    return getUserCreatedQuizzes(userId);
  }

  return await res.json();
};

export const getUserAttemptedQuizzes = async (userId: string): Promise<any> => {
  const token = localStorage.getItem('accessToken');

  const res = await fetch(`${apiUrl}/users/${userId}/quizzes?created=False&attempted=True`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  if (await renewTokenOnExpire(res)) {
    return getUserAttemptedQuizzes(userId);
  }

  return await res.json();
};

export const getQuestionsByQuizId = async (quizId: string): Promise<any> => {
  const token = localStorage.getItem('accessToken');

  const res = await fetch(`${apiUrl}/quizzes/${quizId}/questions`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  if (await renewTokenOnExpire(res)) {
    return getQuestionsByQuizId(quizId);
  }

  return await res.json();
};
