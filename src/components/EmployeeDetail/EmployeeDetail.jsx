import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {Redirect, Link} from 'react-router-dom';

import {makeStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';

import {ActionTypes} from '../../constants/Actions';
import EmployeeEdit from '../EmployeeEdit/EmployeeEdit';

const useStyles = makeStyles(theme => ({
  root: {
    width: `calc(100% - 50px)`,
    marginTop: theme.spacing(3),
    overflowX: 'auto',
    marginLeft: theme.spacing(2),
    display: 'flex',
    justifyContent: 'center'
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
    marginLeft: 70,
    marginRight: 70
  },
  wrapper: {
    overflowX: 'auto',
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(2)
  },
  title: {
    padding: theme.spacing(3),
    textAlign: 'left',
    fontWeight: 600,
    fontSize: 20
  },
  titleLink: {
    padding: theme.spacing(1),
    paddingLeft: theme.spacing(3),
    textAlign: 'left',
    fontWeight: 600,
    fontSize: 16
  },
  formGroupButton: {
    textAlign: 'right'
  },
  container: {
    display: 'block'
  },
  button: {
    margin: theme.spacing(2),
    marginLeft: 0
  },
  detailRow: {
    textAlign: 'left',
    display: 'flex'
  },
  label: {
    alignItems: 'flex-end',
    marginBottom: 10,
    display: 'flex',
    width: 150
  },
  valueField: {
    width: 420
  }
}));

const EmployeeDetail = props => {
  const classes = useStyles();
  const params = props.match.params.id;
  const [redirect, setRedirect] = useState(false);
  const [employee, setEmployee] = useState(null);
  const [editClicked, setEditClicked] = useState(false);

  const {status, selectedEmployee} = props;
  useEffect(() => {
    if (params !== 'add' && !employee) {
      props.fetchEmployee(params);
    }

    if (selectedEmployee) {
      setEmployee(selectedEmployee);
    }

    if (status) {
      setRedirect(true);
      setEditClicked(false);
    }
  }, [params, props, status, employee, selectedEmployee]);

  const saveEmployee = (employee) => {
    props.saveEmployee(employee);
  };

  const returnRedirect = () => {
    if (redirect) {
      if (params === 'add') {
        return (
          <Redirect to="/employees"/>
        );
      } else {
        const route = `/employee/${params}`;
        return (
          <Redirect to={route}/>
        );
      }
    }
  };

  const onCancel = () => {
    setEditClicked(false);
  };

  const onEditClick = () => {
    setEditClicked(true);
  };

  const getRedirectHtml = () => {
    if (params === 'add' || editClicked) {
      const action = params === 'add' ? 'add' : 'edit';
      return (
        <React.Fragment>
          {returnRedirect()}
          <EmployeeEdit action={action}
                        employee={employee}
                        employeeId={params}
                        handleCancel={onCancel}
                        handleSave={saveEmployee}/>
        </React.Fragment>
      );
    } else if (employee) {
      return (
        <div className={classes.root}>
          <Paper className={classes.paper}>
            <div className={classes.titleLink}>
              <Link to='/employees' className={classes.link}>Back to list</Link>
            </div>
            <div className={classes.title}>
              Employee Details
            </div>
            <div className={classes.wrapper}>
              <div className={classes.container}>
                <div className={classes.detailRow}>
                  <div className={classes.label}>First Name</div>
                  <div className={classes.input}>
                    {employee.FirstName}
                  </div>
                </div>
                <div className={classes.detailRow}>
                  <div className={classes.label}>Last Name</div>
                  <div className={classes.input}>
                    {employee.LastName}
                  </div>
                </div>
                <div className={classes.detailRow}>
                  <div className={classes.label}>Title</div>
                  <div className={classes.input}>
                    {employee.Title}
                  </div>
                </div>
                <div className={classes.detailRow}>
                  <div className={classes.label}>Company</div>
                  <div className={classes.input}>
                    {employee.Company}
                  </div>
                </div>
                <Divider/>
                <div className={classes.formGroupButton}>
                  <Button variant="contained"
                          color="primary"
                          className={classes.button}
                          onClick={onEditClick}
                          margin="normal">
                    Edit
                  </Button>
                </div>
              </div>
            </div>
          </Paper>
        </div>
      );
    }
  };

  return (
    <React.Fragment>
      {getRedirectHtml()}
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    selectedEmployee: state.employeeEntities.selectedEmployee,
    status: state.employeeEntities.status
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchEmployee: (id) => dispatch({type: ActionTypes.FETCH_EMPLOYEE, id}),
    saveEmployee: (employee) => dispatch({type: ActionTypes.SAVE_EMPLOYEE, employee})
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeDetail);