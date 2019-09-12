import React, {useState} from 'react';
import {Link, NavLink} from 'react-router-dom'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import {makeStyles, withStyles} from "@material-ui/core";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import LockOpenIcon from '@material-ui/icons/LockOpen';

const useStyles = makeStyles(theme => ({
  link: {
    display: 'block',
    color: '#fff',
    textDecoration: 'none',
    marginRight: 4
  },
  list: {
    width: 'calc(100% - 106px)',
    display: 'flex',
    justifyContent: 'flex-end'
  },
  userProfile: {
    marginRight: theme.spacing(2)
  },
  icon: {
    fontSize: 21
  },
  container: {
    display: 'flex'
  },
  logoutButton: {
    display: 'flex',
    cursor: 'pointer'
  }
}));

const StyledAppBar = withStyles(theme => ({
  root: {
    backgroundColor: '#326da8'
  }
}))(AppBar);

const LoginButton = () => {
  const classes = useStyles();
  return (
    <React.Fragment>
      <React.Fragment>
        <NavLink to='/login' className={classes.link}>Login</NavLink>
        <LockOpenIcon className={classes.icon}/>
      </React.Fragment>
    </React.Fragment>
  );
};

const LogoutButton = (props) => {
  const classes = useStyles();
  const userName = localStorage.getItem('userLoggedIn') ?
    JSON.parse(localStorage.getItem('userLoggedIn'))['name'] : '';
  return (
    <div className={classes.container}>
      <div className={classes.userProfile}>
        <b>Welcome {userName}!</b>
      </div>
      <div className={classes.logoutButton}
           onClick={props.onClick}>
        <span className={classes.link}>Logout</span>
        <ExitToAppIcon />
      </div>
    </div>
  );
};

const NavBar = (props) => {
  const classes = useStyles();
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('login_token') !== null);

  const handleLogout = () => {
    setIsLoggedIn(false);
    props.handleLogout();
  };

  const getNavBarLinks = () => {
    if (isLoggedIn || localStorage.getItem('login_token')) {
      return (
        <LogoutButton onClick={handleLogout}/>
      )
    } else {
      return (
        <LoginButton />
      )
    }
  };

  return(
    <div>
      <StyledAppBar position="static">
        <Toolbar>
          <Typography variant="subtitle1" color="inherit">
            <Link to='/' className={classes.link}>Employee MS</Link>
          </Typography>
          <div className={classes.list}>
            {getNavBarLinks()}
          </div>
        </Toolbar>
      </StyledAppBar>
    </div>
  )
};

export default NavBar;