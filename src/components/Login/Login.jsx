import React, {useState} from 'react';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';

import {makeStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import {ActionTypes} from '../../constants/Actions';
import './Login.css';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'block'
  },
  button: {
    margin: theme.spacing(2),
    width: 350
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 350
  },
  error: {
    color: 'red'
  }
}));

const Login = (props) => {
  const classes = useStyles();
  const [state, setState] = useState({
    email: null,
    password: null
  });

  const handleChange = (event) => {
    const {name, value} = event.target;
    setState({
      ...state,
      [name]: value
    });
  };

  const onLoginClick = () => {
    let {email, password} = state;
    props.login(email, password);
  };

  const getRenderHTML = () => {
    if (localStorage.getItem('login_token') || props.token) {
      return <Redirect to='/employees'/>;
    } else {
      return (
        <div className="login-wrapper">
          <div className="login-container">
            <h2>Login</h2>
            <span className={classes.error}>{props.error}</span>
            <form name="form"
                  className={classes.container}>
              <div className="form-group">
                <TextField label="Email"
                           className={classes.textField}
                           name="email"
                           margin="normal"
                           onChange={handleChange}/>
              </div>
              <div className="form-group">
                <TextField label="Password"
                           name="password"
                           className={classes.textField}
                           type="password"
                           margin="normal"
                           onChange={handleChange}/>
              </div>
              <div className="form-group">
                <Button variant="contained"
                        color="primary"
                        className={classes.button}
                        onClick={onLoginClick}>
                  Login
                </Button>
              </div>
            </form>
          </div>
        </div>
      );
    }
  };

  return getRenderHTML();
};

const mapStateToProps = (state) => {
  return {
    token: state.users.loginInfo.token,
    status: state.users.loginInfo.status,
    error: state.users.loginError
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    login: (email, password) => dispatch({type: ActionTypes.LOGIN_REQUEST, email, password})
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);