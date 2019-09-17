export const FIRST_ACTION = 'FIRST_ACTION';

export interface Payload {
  data: string;
}

export interface FirstAction {
  type: typeof FIRST_ACTION;
  payload: Payload;
}
