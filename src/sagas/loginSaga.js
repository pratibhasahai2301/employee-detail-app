import {call, cancel, cancelled, fork, put, take} from 'redux-saga/effects';
import {ActionTypes} from '../constants/Actions';
import {authenticate} from '../actions/login.actions';

export function* authorize(email, password) {
  try {
    const result = yield call(authenticate, email, password);
    yield put({type: ActionTypes.LOGIN_SUCCESS});
    yield put({type: ActionTypes.SAVE_TOKEN, payload: result});
  } catch (error) {
    yield put({type: ActionTypes.LOGIN_ERROR, error});
  } finally {
    if (yield cancelled()) {
      yield put({type: ActionTypes.LOGIN_CANCELLED});
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
      yield put({type: ActionTypes.DELETE_TOKEN});
    }
  }
}

export function* logoutFlow() {
  while (true) {
    const action = yield take([ActionTypes.LOGOUT, ActionTypes.LOGIN_ERROR]);
    if (action.type === ActionTypes.LOGOUT) {
      yield put({type: ActionTypes.DELETE_TOKEN});
    }
  }
}
