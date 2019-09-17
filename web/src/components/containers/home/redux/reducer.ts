import initialState from './initialState';
import { IFirstAction } from './types';

export default function reducer(state = initialState, action: IFirstAction) {
  switch (action.type) {
    default:
      return state;
  }
}
