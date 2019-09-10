import { all } from 'redux-saga/effects'
import {loginFlow} from './loginSaga';
import {watchFetchEmployees} from './employeeSaga/fetch';

export default function* rootSaga() {
  yield all([
    loginFlow(),
    watchFetchEmployees()
  ])
}
