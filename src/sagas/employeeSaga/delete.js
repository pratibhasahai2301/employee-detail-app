import {takeLatest, put, call} from 'redux-saga/effects';
import {ActionTypes} from '../../constants/Actions';
import {deleteEmployeeById} from '../../actions/employee.action';

function* deleteEmployee(action) {
  yield put({type: ActionTypes.DELETE_EMPLOYEE_PENDING, id: action.id});

  try {
    const {count, result} = yield call(deleteEmployeeById, action.id);
    if (count !== 1) {
      throw new Error('API delete request failed');
    }
    yield put({type: ActionTypes.DELETE_EMPLOYEE_SUCCESS, result});
  } catch (error) {
    yield put({type: ActionTypes.DELETE_EMPLOYEE_FAILURE, error});
  }
}

export default function* watchDeleteEmployee() {
  yield takeLatest(ActionTypes.DELETE_EMPLOYEE, deleteEmployee);
}
