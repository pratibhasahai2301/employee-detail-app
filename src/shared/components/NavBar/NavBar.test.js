import React from 'react';
import { shallow } from 'enzyme';
import NavBar from './NavBar';

describe('NavBar tests', () => {

  it('shows render NavBar with no error', () => {
    shallow(<NavBar />);
  });

  it('shows Login in the header when there is no localStorage', () => {
    shallow(<NavBar />);
  });

  it ('shows Logout in the header when there is localStorage set', () => {

  });
});