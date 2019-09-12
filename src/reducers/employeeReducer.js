import {ActionTypes} from '../constants/Actions';

const initialState = {
  employees: [],
  error: null,
  selectedEmployee: {},
  status: null
};

const employeeReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.FETCH_EMPLOYEES_SUCCESS : {
      return {
        ...state,
        status: null,
        error: null,
        employees: action.payload
      };
    }
    case ActionTypes.FETCH_EMPLOYEES_FAILURE : {
      return {
        ...state,
        employees: [],
        status: null,
        error: action.error
      };
    }
    case ActionTypes.FETCH_EMPLOYEES_PENDING : {
      return {
        ...state,
        status: null,
        error: null,
        employees: []
      };
    }
    case ActionTypes.DELETE_EMPLOYEE_PENDING : {
      return {
        ...state,
        status: null,
        error: null
      };
    }
    case ActionTypes.DELETE_EMPLOYEE_SUCCESS : {
      return {
        ...state,
        employees: action.payload,
        status: 'Employee Deleted Successfully',
        error: null
      };
    }
    case ActionTypes.DELETE_EMPLOYEE_FAILURE : {
      return {
        ...state,
        status: null,
        error: action.error
      };
    }
    case ActionTypes.SAVE_EMPLOYEE_PENDING : {
      return {
        ...state,
        status: null,
        error: null
      };
    }
    case ActionTypes.SAVE_EMPLOYEE_SUCCESS : {
      return {
        ...state,
        employees: action.payload,
        status: 'Employee Details Saved Successfully',
        error: null
      };
    }
    case ActionTypes.SAVE_EMPLOYEE_FAILURE : {
      return {
        ...state,
        employees: [],
        status: null,
        error: action.error
      };
    }
    case ActionTypes.FETCH_EMPLOYEE_PENDING : {
      return {
        ...state,
        status: null,
        error: null,
        selectedEmployee: null
      };
    }
    case ActionTypes.FETCH_EMPLOYEE_SUCCESS : {
      return {
        ...state,
        selectedEmployee: action.payload,
        status: null,
        error: null
      };
    }
    case ActionTypes.FETCH_EMPLOYEE_FAILURE : {
      return {
        ...state,
        selectedEmployee: null,
        status: null,
        error: action.error
      };
    }
    default : {
      return state;
    }
  }
};

export default employeeReducer;