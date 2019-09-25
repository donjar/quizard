export const SET_LOADING_COMPLETE = 'SET_LOADING_COMPLETE';

export interface ISetLoadingPayload {
  hasLoaded: boolean;
}

export interface ISetLoadingAction {
  type: typeof SET_LOADING_COMPLETE;
  payload: ISetLoadingPayload;
}

export interface ILoadingState {
  hasLoaded: boolean;
}

export type ILoadingActionTypes = ISetLoadingAction;
