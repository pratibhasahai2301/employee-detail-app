import * as actions from './employee.action';

describe('Employee actions', () => {
  it('FETCH_EMPLOYEES_SUCCESS: should create an action with correct type', () => {
    const expectedAction = {
      type: 'FETCH_EMPLOYEES_SUCCESS',
      payload: []
    };
    expect(actions.fetchEmployeesSuccess([])).toEqual(expectedAction);
  });
});