import React, {useEffect} from 'react';
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
  const token = localStorage.getItem('login_token');
  const userLoggedIn = localStorage.getItem('userLoggedIn');
  const userName = userLoggedIn ? userLoggedIn['name'] : '';
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

  const getLogin = () => {
    if (localStorage.getItem('login_token')) {
      return (
        <Switch>
          <Route exact path={Routes.Root} component={Login}/>
          <Route path={Routes.Login} component={Login}/>
          <Route path={Routes.Employees} component={EmployeeList}/>
          <Route path={Routes.EmployeeDetail} component={EmployeeDetail}/>
          <Route path={Routes.EmployeeDetailAdd} component={EmployeeDetail}/>
        </Switch>
      );
    } else {
      return (
        <Login/>
      );
    }
  };

  return (
    <div className="App">
      <NavBar handleLogout={onHandleLogout}
              token={token}
              userName={userName}/>
      <main>
        <div className='container dashboard'>
          {getLogin()}
        </div>
        <ToastContainer/>
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
