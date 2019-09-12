import {takeLatest, put, call} from 'redux-saga/effects';
import {ActionTypes} from '../../constants/Actions';
import {saveEmployeeDetails} from '../../mockApis/employee.api';
import {saveEmployeeFailure, saveEmployeePending, saveEmployeeSuccess} from '../../actions/employee.action';

function* saveEmployee(action) {
  yield put(saveEmployeePending());

  try {
    const response = yield call(saveEmployeeDetails, action.employee);
    yield put(saveEmployeeSuccess(response));
  } catch (error) {
    yield put(saveEmployeeFailure(error));
  }
}

export default function* watchSaveEmployee() {
  yield takeLatest(ActionTypes.SAVE_EMPLOYEE, saveEmployee);
}
