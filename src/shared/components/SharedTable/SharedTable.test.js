import React from 'react';
import SharedTable from './SharedTable';
import renderer from 'react-test-renderer';

const employees = [
  {
    id: '5d6f70562db7ce28a19c048c',
    Title: 'Ms',
    FirstName: 'Selena',
    LastName: 'Merrill',
    Company: 'KINDALOO'
  },
  {
    id: '5d6f7056adc94ae5fbcfd2da',
    Title: 'Dr',
    FirstName: 'Mckay',
    LastName: 'Wilson',
    Company: 'IPLAX'
  }
];

const headerCells = [
  {label: 'First Name', key: 'FirstName'},
  {label: 'Last Name', key: 'LastName'},
  {label: 'Title', key: 'Title'},
  {label: 'Company', key: 'Company'}
];

const dialog = {
  title: 'Delete employee',
  message: 'Are you sure, you want to delete this employee?'
};

const onHandleSave = (employee) => {
  console.log('on handle save click');
};

const onHandleDeleteClick = (employeeId) => {
  console.log('on handle delete click')
};

it('deep snapshot renders correctly', () => {
  const tree = renderer.create(<SharedTable data={employees}
                                            headCells={headerCells}
                                            dialog={dialog}
                                            dataKey={'id'}
                                            defaultSortField={'FirstName'}
                                            defaultSortOrder={'desc'}
                                            handleSave={onHandleSave}
                                            handleDeleteClick={onHandleDeleteClick}/>).toJSON();
  expect(tree).toMatchSnapshot();
});