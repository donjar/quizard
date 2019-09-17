import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './rootReducer';

export type AppState = ReturnType<typeof rootReducer>;

export function configureStore<AppState>(initialState = {}) {
  return createStore(rootReducer, initialState, applyMiddleware(thunk));
}
