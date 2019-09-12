import {call, cancel, cancelled, fork, put, take} from 'redux-saga/effects';
import {ActionTypes} from '../constants/Actions';
import {authenticate} from '../mockApis/login.api';
import {deleteToken, loginCanceled, loginError, loginSuccess, saveToken} from '../actions/login.action';

export function* authorize(email, password) {
  try {
    const result = yield call(authenticate, email, password);
    yield put(loginSuccess());
    yield put(saveToken(result));
  } catch (error) {
    yield put(loginError(error));
  } finally {
    if (yield cancelled()) {
      yield put(loginCanceled());
    }
  }
}

export function* loginFlow() {
  while (true) {
    const {email, password} = yield take(ActionTypes.LOGIN_REQUEST);
    const task = yield fork(authorize, email, password);
    const action = yield take([ActionTypes.LOGOUT, ActionTypes.LOGIN_ERROR]);
    if (action.type === ActionTypes.LOGOUT) {
      yield cancel(task);
      yield put(deleteToken());
    }
  }
}

export function* logoutFlow() {
  while (true) {
    const action = yield take([ActionTypes.LOGOUT, ActionTypes.LOGIN_ERROR]);
    if (action.type === ActionTypes.LOGOUT) {
      yield put(deleteToken());
    }
  }
}
