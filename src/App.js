import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {toast, ToastContainer} from 'react-toastify';
import {Switch, Route} from 'react-router-dom';

import NavBar from './shared/components/NavBar/NavBar';
import Login from './components/Login/Login';
import {Routes} from './constants/Routes';
import EmployeeList from './components/EmployeeList/EmployeeList';
import EmployeeDetail from './components/EmployeeDetail/EmployeeDetail';
import {ActionTypes} from './constants/Actions';
import './App.css';
import 'react-toastify/dist/ReactToastify.css';

const App = (props) => {
  const onHandleLogout = () => {
    props.logout();
  };

  useEffect(() => {
    if (props.status) {
      setTimeout(() => {
        toast.success(props.status, {autoClose: 1000, pauseOnFocusLoss: false});
      });
    }

    if (props.error) {
      toast.error(props.error, {autoClose: 1000, pauseOnFocusLoss: false});
    }
  });

  return (
    <div className="App">
      <NavBar handleLogout={onHandleLogout}/>
      <main>
        <div className='container dashboard'>
          <Switch>
            <Route exact path={Routes.Root} component={Login}/>
            <Route path={Routes.Login} component={Login}/>
            <Route path={Routes.Employees} component={EmployeeList}/>
            <Route path={Routes.EmployeeDetail} component={EmployeeDetail}/>
            <Route path={Routes.EmployeeDetailAdd} component={EmployeeDetail}/>
          </Switch>
          <ToastContainer/>
        </div>
      </main>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    status: state.employeeEntities.status,
    error: state.employeeEntities.error
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch({type: ActionTypes.LOGOUT})
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
