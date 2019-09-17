import initialState from './initialState';
import { FirstAction } from './types';

export default function reducer(state = initialState, action: FirstAction) {
  switch (action.type) {
    default:
      return state;
  }
}
