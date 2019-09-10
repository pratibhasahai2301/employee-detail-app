import {takeLatest, put, call} from 'redux-saga/effects';
import {ActionTypes} from '../../constants/Actions';
import {saveEmployeeDetails} from '../../actions/employee.action';

function* saveEmployee(action) {
  yield put({type: ActionTypes.SAVE_EMPLOYEE_PENDING});

  try {
    const response = yield call(saveEmployeeDetails, action.employee);
    yield put({type: ActionTypes.SAVE_EMPLOYEE_SUCCESS, payload: response});
  } catch (error) {
    yield put({type: ActionTypes.SAVE_EMPLOYEE_FAILURE, error});
  }
}

export default function* watchSaveEmployee() {
  yield takeLatest(ActionTypes.SAVE_EMPLOYEE, saveEmployee);
}
