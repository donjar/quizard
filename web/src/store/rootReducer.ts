import { combineReducers } from 'redux';
import homeReducer from '../components/containers/home/redux/reducer';

export default combineReducers({
  home: homeReducer
});
