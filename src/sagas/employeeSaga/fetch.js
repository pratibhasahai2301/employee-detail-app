import {takeLatest, put, call} from 'redux-saga/effects';
import {LoadAllEmployees} from '../../mockApis/employee.api';
import {ActionTypes} from '../../constants/Actions';
import {fetchEmployeesFailure, fetchEmployeesPending, fetchEmployeesSuccess} from '../../actions/employee.action';

export function* fetchEmployees() {
  yield put(fetchEmployeesPending());
  try {
    const employees = yield call(LoadAllEmployees);
    yield put(fetchEmployeesSuccess(employees));
  } catch (error) {
    yield put(fetchEmployeesFailure('Error occurred while fetching data'));
  }
}

export function* watchFetchEmployees() {
  yield takeLatest(ActionTypes.FETCH_EMPLOYEES, fetchEmployees);
}
