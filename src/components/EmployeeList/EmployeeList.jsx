import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';

import Paper from '@material-ui/core/Paper';
import {makeStyles} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';

import SharedTable from '../../shared/components/SharedTable/SharedTable';
import {ActionTypes} from '../../constants/Actions';

const useStyles = makeStyles(theme => ({
  root: {
    width: `calc(100% - 50px)`,
    marginTop: theme.spacing(3),
    overflowX: 'auto',
    marginLeft: theme.spacing(2)
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2)
  },
  header: {
    padding: theme.spacing(2),
    display: 'flex'
  },
  title: {
    fontSize: 18,
    width: 'calc(100% - 180px)'
  },
  buttonContainer: {
    width: 180,
    display: 'flex',
    justifyContent: 'flex-end'
  }
}));

const getDialogInfo = () => {
  return {
    title: 'Delete employee',
    message: 'Are you sure, you want to delete this employee?'
  };
};

const EmployeeList = props => {
  const classes = useStyles();
  const dialog = getDialogInfo();
  const defaultSortOrderField = 'FirstName';
  const defaultSortOrder = 'desc';
  const [isLoading, setIsLoading] = useState(false);
  const [redirectToAddEmployee, setRedirectToAddEmployee] = useState(false);
  const [employeeData, setEmployeeData] = useState([]);

  const headerCells = [
    {label: 'First Name', key: 'FirstName'},
    {label: 'Last Name', key: 'LastName'},
    {label: 'Title', key: 'Title'},
    {label: 'Company', key: 'Company'}
  ];

  useEffect(() => {
    if (employeeData.length === 0) {
      props.fetchEmployees();
      setIsLoading(true);
    }
    if (props.employees.length) {
      setEmployeeData(props.employees);
      setIsLoading(false);
    }
  }, [employeeData, props, isLoading]);

  const onHandleSave = (employee) => {
    props.saveEmployee(employee);
  };

  const onHandleDeleteClick = (employeeId) => {
    props.deleteEmployee(employeeId);
  };

  if (!localStorage.getItem('login_token')) {
    return (
      <Redirect to='/login'/>
    );
  }

  const onAddEmployeeClick = () => {
    setRedirectToAddEmployee(true);
  };

  const renderRedirect = () => {
    if (redirectToAddEmployee) {
      return (
        <Redirect to='/employee/add'/>
      );
    }
  };

  return (
    <React.Fragment>
      {renderRedirect()}
      <div className={classes.root}>
        <Paper className={classes.paper}>
          <div className={classes.header}>
            <div className={classes.title}>
              Employee List
            </div>
            <div className={classes.buttonContainer}>
              <Button variant="contained"
                      margin="normal"
                      onClick={() => onAddEmployeeClick()}>
                <AddIcon/>
                Add Employee
              </Button>
            </div>
          </div>
          <SharedTable data={props.employees}
                       headCells={headerCells}
                       dialog={dialog}
                       dataKey={'id'}
                       defaultSortField={defaultSortOrderField}
                       defaultSortOrder={defaultSortOrder}
                       handleSave={onHandleSave}
                       handleDeleteClick={onHandleDeleteClick}/>
        </Paper>
      </div>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    employees: state.employeeEntities.employees
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchEmployees: () => dispatch({type: ActionTypes.FETCH_EMPLOYEES}),
    deleteEmployee: (id) => dispatch({type: ActionTypes.DELETE_EMPLOYEE, id}),
    saveEmployee: (employee) => dispatch({type: ActionTypes.SAVE_EMPLOYEE, employee})
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeList);