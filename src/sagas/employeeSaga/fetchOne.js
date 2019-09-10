import {takeLatest, put, call} from 'redux-saga/effects';
import {ActionTypes} from '../../constants/Actions';
import {getEmployeeById} from '../../actions/employee.action';

function* fetchEmployee(action) {
  yield put({type: ActionTypes.FETCH_EMPLOYEE_PENDING, id: action.id});

  try {
    const employee = yield call(getEmployeeById, action.id);
    if (!employee) {
      throw new Error('API fetch request failed');
    }
    yield put({type: ActionTypes.FETCH_EMPLOYEE_SUCCESS, payload: employee});
  } catch (error) {
    yield put({type: ActionTypes.FETCH_EMPLOYEE_FAILURE, error});
  }
}

export default function* watchFetchEmployee() {
  yield takeLatest(ActionTypes.FETCH_EMPLOYEE, fetchEmployee);
}
