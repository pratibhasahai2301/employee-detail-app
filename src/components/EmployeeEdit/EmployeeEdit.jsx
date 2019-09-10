import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {Redirect} from 'react-router-dom';

import {makeStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';

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
  formWrapper: {
    overflowX: 'auto',
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3)
  },
  title: {
    padding: theme.spacing(3),
    textAlign: 'left',
    fontWeight: 600,
    fontSize: 20
  },
  formGroup: {
    textAlign: 'left',
    display: 'flex'
  },
  label: {
    alignItems: 'flex-end',
    marginBottom: 10,
    display: 'flex',
    width: 150
  },
  input: {
    width: 420
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
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 400
  },
  errorMessage: {
    fontSize: 12,
    color: 'red',
    alignItems: 'flex-end',
    marginBottom: 15,
    display: 'flex'
  }
}));

const EmployeeEdit = props => {
  const initialEmployeeData = {
    FirstName: '',
    LastName: '',
    Title: '',
    Company: ''
  };
  const classes = useStyles();
  const [cancelClicked, setCancelClicked] = useState(false);
  const [employee, setEmployee] = useState(initialEmployeeData);
  const [errorMessage, setErrorMessage] = useState({});

  useEffect(() => {
    if (props.action === 'edit' && props.employee) {
      setEmployee(props.employee);
    }
  }, [props.action, props.employee, employee]);

  const onCancelClick = () => {
    setEmployee(initialEmployeeData);
    setCancelClicked(true);
    props.handleCancel();
  };

  const onSave = (event) => {
    setErrorMessage({});
    let message = {...errorMessage};
    if (!employee.FirstName) {
      message = {...message, FirstName: 'This field is required'};
    }
    if (!employee.LastName) {
      message = {...message, LastName: 'This field is required'};
    }
    setErrorMessage(message);
    if (Object.keys(message).length === 0) {
      props.handleSave(employee);
    }
  };

  const handleChange = (event: Event) => {
    employee[event.target.name] = event.target.value;
    setEmployee({...employee});
  };

  const returnRedirect = () => {
    if (cancelClicked) {
      if (props.action === 'add') {
        return (
          <Redirect to="/employees"/>
        );
      } else {
        const route = `/employee/${props.employeeId}`;
        return (
          <Redirect to={route}/>
        );
      }
    }
  };

  return (
    <React.Fragment>
      {returnRedirect()}
      <div className={classes.root}>
        <Paper className={classes.paper}>
          <div className={classes.title}>
            {props.action === 'add' ? 'Add Employee' : 'Edit Employee'}
          </div>
          <div className={classes.formWrapper}>
            <form name="form" className={classes.container}>
              <div className={classes.formGroup}>
                <div className={classes.label}>First Name *</div>
                <div className={classes.input}>
                  <TextField
                    placeholder="First Name"
                    name="FirstName"
                    className={classes.textField}
                    margin="normal"
                    onChange={(event) => handleChange(event)}
                    value={employee.FirstName}
                  />
                </div>
                <div className={classes.errorMessage}>
                  {errorMessage['FirstName']}
                </div>
              </div>
              <div className={classes.formGroup}>
                <div className={classes.label}>Last Name *</div>
                <div className={classes.input}>
                  <TextField
                    placeholder="Last Name"
                    name="LastName"
                    className={classes.textField}
                    margin="normal"
                    onChange={(event) => handleChange(event)}
                    value={employee.LastName}
                  />
                </div>
                <div className={classes.errorMessage}>
                  {errorMessage['LastName']}
                </div>
              </div>
              <div className={classes.formGroup}>
                <div className={classes.label}>Title</div>
                <div className={classes.input}>
                  <TextField
                    placeholder="Title"
                    name="Title"
                    className={classes.textField}
                    margin="normal"
                    onChange={(event) => handleChange(event)}
                    value={employee.Title}
                  />
                </div>
              </div>
              <div className={classes.formGroup}>
                <div className={classes.label}>Company</div>
                <div className={classes.input}>
                  <TextField
                    placeholder="Company"
                    name="Company"
                    className={classes.textField}
                    margin="normal"
                    onChange={(event) => handleChange(event)}
                    value={employee.Company}
                  />
                </div>
              </div>
              <Divider/>
              <div className={classes.formGroupButton}>
                <Button variant="contained" color="primary" className={classes.button} margin="normal"
                        onClick={onSave}>
                  Save
                </Button>
                <Button variant="contained" className={classes.button} margin="normal"
                        onClick={onCancelClick}>
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        </Paper>
      </div>
    </React.Fragment>
  );
};

EmployeeEdit.propTypes = {
  employee: PropTypes.object,
  employeeId: PropTypes.string,
  error: PropTypes.string,
  status: PropTypes.string,
  action: PropTypes.string,
  handleSave: PropTypes.func,
  handleCancel: PropTypes.func
};

export default EmployeeEdit;