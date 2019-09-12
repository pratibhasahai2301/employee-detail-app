import {put, call} from 'redux-saga/effects';
import {cloneableGenerator} from '@redux-saga/testing-utils';

import {fetchEmployees} from './fetch';

import {LoadAllEmployees} from '../../mockApis/employee.api';
import {
  fetchEmployeesPending, fetchEmployeesSuccess
} from '../../actions/employee.action';

describe('Fetch Employees', () => {
  const generator = cloneableGenerator(fetchEmployees)();

  test('fetch employees', () => {
    const clone = generator.clone();
    const employees = [];
    expect(clone.next().value).toEqual(put(fetchEmployeesPending()));
    expect(clone.next().value).toEqual(call(LoadAllEmployees));

    expect(clone.next(employees).value)
      .toEqual(put(fetchEmployeesSuccess(employees)));
    expect(clone.next().done).toBe(true);
  });
});
