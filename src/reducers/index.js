import {combineReducers} from 'redux';
import userReducer from './userReducer';
import employeeReducer from './employeeReducer';

const rootReducer = combineReducers({
  users: userReducer,
  employeeEntities: employeeReducer
});

export default rootReducer;