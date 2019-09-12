import {ActionTypes} from '../constants/Actions';

export const fetchEmployeesSuccess = (payload) => ({type: ActionTypes.FETCH_EMPLOYEES_SUCCESS, payload});
export const fetchEmployeesFailure = (error) => ({type: ActionTypes.FETCH_EMPLOYEES_FAILURE, error});
export const fetchEmployeesPending = () => ({type: ActionTypes.FETCH_EMPLOYEE_PENDING})
;export const deleteEmployeePending = () => ({type: ActionTypes.DELETE_EMPLOYEE_PENDING});
export const deleteEmployeeSuccess = (payload) => ({type: ActionTypes.DELETE_EMPLOYEE_SUCCESS, payload});
export const deleteEmployeeFailure = (error) => ({type: ActionTypes.DELETE_EMPLOYEE_FAILURE, error});
export const saveEmployeeSuccess = (payload) => ({type: ActionTypes.SAVE_EMPLOYEE_SUCCESS, payload});
export const saveEmployeeFailure = (error) => ({type: ActionTypes.SAVE_EMPLOYEE_FAILURE, error});
export const saveEmployeePending = () => ({type: ActionTypes.SAVE_EMPLOYEE_PENDING});
export const fetchEmployeeFailure = (error) => ({type: ActionTypes.FETCH_EMPLOYEES_FAILURE, error});
export const fetchEmployeeSuccess = (payload) => ({type: ActionTypes.FETCH_EMPLOYEE_SUCCESS, payload});
export const fetchEmployeePending = () => ({type: ActionTypes.FETCH_EMPLOYEE_PENDING});