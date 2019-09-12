import React from 'react';
import {Link, NavLink} from 'react-router-dom'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import {makeStyles, withStyles} from "@material-ui/core";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import PropTypes from 'prop-types';

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

const NavBar = (props) => {
  const classes = useStyles();
  const getNavBarLink = () => {
    if (props.token) {
      return (
        <div className={classes.container}>
          <div className={classes.userProfile}>
            Welcome <b>{props.userName}!</b>
          </div>
          <div className={classes.logoutButton}
               onClick={()=>props.handleLogout()}>
            <span className={classes.link}>Logout</span>
            <ExitToAppIcon />
          </div>
        </div>
      );
    } else {
      return (
        <React.Fragment>
          <NavLink to='/login' className={classes.link}>Login</NavLink>
          <LockOpenIcon className={classes.icon}/>
        </React.Fragment>
      );
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
            {getNavBarLink()}
          </div>
        </Toolbar>
      </StyledAppBar>
    </div>
  )
};

NavBar.propTypes = {
  token: PropTypes.string,
  userName: PropTypes.string,
  handleLogout: PropTypes.func,
};

export default NavBar;