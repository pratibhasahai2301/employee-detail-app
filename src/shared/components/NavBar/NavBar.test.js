import React from 'react';
import NavBar from './NavBar';
import renderer from 'react-test-renderer';
import {BrowserRouter} from 'react-router-dom';

const onHandleLogout = () => {
  console.log('logging out');
};

it('deep snapshot renders correctly for logged in user', () => {
  const token = 'P@sst0ken';
  const userName = 'Alice';
  const tree = renderer.create(
    <BrowserRouter>
    <NavBar handleLogout={onHandleLogout}
                                       token={token}
                                       userName={userName}/>
    </BrowserRouter>).toJSON();
  expect(tree).toMatchSnapshot();
});
