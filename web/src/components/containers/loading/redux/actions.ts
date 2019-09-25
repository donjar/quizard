import {
  ILoadingActionTypes,
  SET_LOADING_COMPLETE
} from './types';

export const setLoadingComplete = (hasLoaded: boolean): ILoadingActionTypes => ({
  payload: { hasLoaded },
  type: SET_LOADING_COMPLETE
});
