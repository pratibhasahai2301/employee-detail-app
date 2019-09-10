import React from 'react';
import SharedTableHead from './SharedTableHead';
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

const handleRequestSort = () => {
  console.log('on handle sort')
};

it('deep snapshot renders correctly', () => {
  const tree = renderer.create(<SharedTableHead order="desc"
                                                orderBy="FirstName"
                                                headCells={headerCells}
                                                onRequestSort={handleRequestSort}
                                                rowCount={employees.length}/>).toJSON();
  expect(tree).toMatchSnapshot();
});