import {takeLatest, put, call} from 'redux-saga/effects';
import {ActionTypes} from '../../constants/Actions';
import {getEmployeeById} from '../../mockApis/employee.api';
import {fetchEmployeePending, fetchEmployeeFailure, fetchEmployeeSuccess} from '../../actions/employee.action';

function* fetchEmployee(action) {
  yield put(fetchEmployeePending());

  try {
    const employee = yield call(getEmployeeById, action.id);
    if (!employee) {
      throw new Error('API fetch request failed');
    }
    yield put(fetchEmployeeSuccess(employee));
  } catch (error) {
    yield put(fetchEmployeeFailure(error));
  }
}

export default function* watchFetchEmployee() {
  yield takeLatest(ActionTypes.FETCH_EMPLOYEE, fetchEmployee);
}
