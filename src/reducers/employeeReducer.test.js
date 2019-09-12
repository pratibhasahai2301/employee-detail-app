import React from 'react';
import employeeReducer from './employeeReducer';

const initialState = {
  employees: [],
  error: null,
  selectedEmployee: {},
  status: null
};

describe('Test employeeReducer', () => {
  it('reducer for FETCH_EMPLOYEES', () => {
    const payload = [{
      id: 'emp1',
      Name: 'Test Test'
    }];
    let state = employeeReducer(initialState, {type: 'FETCH_EMPLOYEES_SUCCESS', payload});
    expect(state.employees).toEqual(payload);
  });

  it('reducer for FETCH_EMPLOYEES_ERROR', () => {
    const state = employeeReducer(initialState, {type: 'FETCH_EMPLOYEES_FAILURE', error: 'Error'});
    expect(state.employees).toEqual([]);
    expect(state.error).toEqual('Error');
  });

});
