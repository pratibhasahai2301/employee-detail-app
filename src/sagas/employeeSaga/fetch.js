import {takeLatest, put, call} from 'redux-saga/effects';
import {LoadAllEmployees} from '../../actions/employee.action';
import {ActionTypes} from '../../constants/Actions';

function* fetchEmployees() {
  yield put({type: 'FETCH_EMPLOYEES_PENDING'});
  try {
    const employees = yield call(LoadAllEmployees);
    yield put({type: ActionTypes.FETCH_EMPLOYEES_SUCCESS, payload: employees});
  } catch (error) {
    yield put({type: ActionTypes.FETCH_EMPLOYEES_FAILURE, error: 'Error occurred while fetching data'});
  }
}

export function* watchFetchEmployees() {
  yield takeLatest(ActionTypes.FETCH_EMPLOYEES, fetchEmployees);
}
