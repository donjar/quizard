import initialState from './initialState';
import { ILoadingActionTypes, ILoadingState, SET_LOADING_COMPLETE } from './types';

export default function reducer(
  state = initialState,
  action: ILoadingActionTypes
): ILoadingState {
  switch (action.type) {
    case SET_LOADING_COMPLETE:
      return {
        hasLoaded: action.payload.hasLoaded
      };
    default:
      return state;
  }
}
