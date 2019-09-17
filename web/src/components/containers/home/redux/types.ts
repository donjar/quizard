export const FIRST_ACTION = 'FIRST_ACTION';

export interface IPayload {
  data: string;
}

export interface IFirstAction {
  type: typeof FIRST_ACTION;
  payload: IPayload;
}
