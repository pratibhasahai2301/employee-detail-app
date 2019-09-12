import {takeLatest, put, call} from 'redux-saga/effects';
import {ActionTypes} from '../../constants/Actions';
import {deleteEmployeeById} from '../../mockApis/employee.api';
import {deleteEmployeeFailure, deleteEmployeePending, deleteEmployeeSuccess} from '../../actions/employee.action';

function* deleteEmployee(action) {
  yield put(deleteEmployeePending());

  try {
    const {count, result} = yield call(deleteEmployeeById, action.id);
    if (count !== 1) {
      throw new Error('API delete request failed');
    }
    yield put(deleteEmployeeSuccess(result));
  } catch (error) {
    yield put(deleteEmployeeFailure(error));
  }
}

export default function* watchDeleteEmployee() {
  yield takeLatest(ActionTypes.DELETE_EMPLOYEE, deleteEmployee);
}
