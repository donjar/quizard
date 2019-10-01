import { IQuizCreateApi } from './interfaces/quiz-create/index';

const apiUrl = 'https://api.quizard.xyz';

export const renewTokenOnExpire = async (res: Response) => {
  if (res.status === 401) {
    const data = (await res.clone().json()).error;
    if (data === 'Token has expired') {
      const token = (await refresh()).access_token;
      localStorage.setItem('accessToken', token);
      return true;
    }
  }
  return false;
};

export const addAuthHeader = (options: any, token: string) => {
  if (options) {
    if (options.headers) {
      options.headers.Authorization = `Bearer ${token}`;
    } else {
      options.headers = {
        Authorization: `Bearer ${token}`
      };
    }
  } else {
    options = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };
  }

  return options;
};

export const fetchWithAuth = async (url: string, options?: any) => {
  let res;
  do {
    const token = localStorage.getItem('accessToken');
    if (token) {
      options = addAuthHeader(options, token);
    }

    res = await fetch(url, options);
  } while (await renewTokenOnExpire(res));

  return res;
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
  const res = await fetchWithAuth(`${apiUrl}/quizzes`, {
    method: 'POST',
    body: JSON.stringify(values),
  });

  return await res.json();
};

export const redoQuiz = async (quizId: string): Promise<any> => {
  const res = await fetchWithAuth(`${apiUrl}/quizzes/${quizId}/attempt`, {
    method: 'POST',
  });

  return await res.json();
};

export const getAllQuizzes = async (): Promise<any> => {
  const res = await fetchWithAuth(`${apiUrl}/quizzes`);

  return await res.json();
};

export const getQuizById = async (quizId: string): Promise<any> => {
  const res = await fetchWithAuth(`${apiUrl}/quizzes/${quizId}`);

  return await res.json();
};

export const getQuizAttemptStatus = async (quizId: string): Promise<any> => {
  const res = await fetchWithAuth(`${apiUrl}/quizzes/${quizId}/attempt`);

  return await res.json();
};

export const getUserCreatedQuizzes = async (userId: string): Promise<any> => {
  const res = await fetchWithAuth(`${apiUrl}/users/${userId}/quizzes/created`);

  return await res.json();
};

export const getUserAttemptedQuizzes = async (userId: string): Promise<any> => {
  const res = await fetchWithAuth(`${apiUrl}/users/${userId}/quizzes/attempted`);

  return await res.json();
};

export const getQuestionsByQuizId = async (quizId: string): Promise<any> => {
  const res = await fetchWithAuth(`${apiUrl}/quizzes/${quizId}/questions`);

  return await res.json();
};

export const getLatestQuizAttempt = async (quizId: string): Promise<any> => {
  const res = await fetchWithAuth(`${apiUrl}/quizzes/${quizId}/attempt`);

  return await res.json();
};

export const checkQuizQuestionAnswer = async (
  quizId: string,
  questionId: string,
  optionIdx: number
): Promise<any> => {
  const res = await fetchWithAuth(`${apiUrl}/quizzes/${quizId}/questions/${questionId}/answers`, {
    method: 'POST',
    body: JSON.stringify({
      selected_option: optionIdx
    })
  });

  return await res.json();
};

export const getQuizStatisticsByQuizId = async (quizId: string): Promise<any> => {
  const res = await fetchWithAuth(`${apiUrl}/quizzes/${quizId}/summary`);

  return await res.json();
};
