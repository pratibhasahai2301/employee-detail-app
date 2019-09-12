import React, {useEffect, useState} from 'react';
import {Redirect} from 'react-router-dom';

import {makeStyles, withStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import TextField from '@material-ui/core/TextField';
import CheckIcon from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';

import SharedTableHead from '../SharedTableHead/SharedTableHead';
import PropTypes from 'prop-types';

function desc(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function stableSort(array, cmp) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = cmp(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}

function getSorting(order, orderBy) {
  return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);
}

const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white
  },
  body: {
    fontSize: 14
  }
}))(TableCell);

const StyledTableRow = withStyles(theme => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default
    }
  }
}))(TableRow);

const useStyles = makeStyles(theme => ({
  table: {
    minWidth: 750
  },
  tableWrapper: {
    overflowX: 'auto',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2)
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1
  },
  icon: {
    marginRight: theme.spacing(2),
    cursor: 'pointer'
  },
  action: {
    width: 80,
    paddingLeft: 12
  },
  sortLabel: {
    color: '#fff !important'
  }
}));

const SharedTable = (props) => {
  const classes = useStyles();
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [order, setOrder] = useState(props.defaultSortOrder);
  const [orderBy, setOrderBy] = useState(props.defaultSortField);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [rowBeingEdited, setRowBeingEdited] = useState(null);
  const [redirectToEditEmployee, setRedirectToEditEmployee] = useState(null);
  const [employeeData, setEmployeeData] = useState([]);

  useEffect(() => {
    const sortedArray = stableSort(props.data, getSorting(order, orderBy));
    setEmployeeData(JSON.parse(JSON.stringify(sortedArray)));
  }, [props, order, orderBy]);

  function onDeleteClick(event: Event, employee) {
    event.stopPropagation();
    setRowBeingEdited(null);
    setOpenDialog(true);
    setSelectedEmployee(employee);
  }

  function onEditClick(event: Event, employee) {
    event.stopPropagation();
    setRowBeingEdited(employee[props.dataKey]);
  }

  function onSaveClick(event: Event) {
    event.stopPropagation();
    props.handleSave(selectedEmployee);
    setSelectedEmployee(null);
    setRowBeingEdited(null);
  }

  function onClearClick(event: Event) {
    event.stopPropagation();
    const index = employeeData.findIndex(entry => entry.id === rowBeingEdited);
    employeeData[index] = props.data.find(entry => entry.id === rowBeingEdited);
    setRowBeingEdited(null);
    setSelectedEmployee(null);
  }

  function onDialogCancelClick() {
    setOpenDialog(false);
  }

  function onDialogConfirmClick() {
    setOpenDialog(false);
    props.handleDeleteClick(selectedEmployee[props.dataKey]);
  }

  function handleRequestSort(event, property) {
    setRowBeingEdited(null);
    // revert any changes made while editing
    if (JSON.stringify(props.data) !== JSON.stringify(employeeData)) {
      setEmployeeData(JSON.parse(JSON.stringify(props.data)));
    }
    const isDesc = orderBy === property && order === 'desc';
    setOrder(isDesc ? 'asc' : 'desc');
    setOrderBy(property);
    const sortedArray = stableSort(props.data, getSorting(order, orderBy));
    setEmployeeData(JSON.parse(JSON.stringify(sortedArray)));
  }

  function handleClick(event: Event, id) {
    if (id !== rowBeingEdited) {
      setRedirectToEditEmployee(id);
    } else {
      event.stopPropagation();
    }
  }

  function returnRedirect() {
    if (redirectToEditEmployee) {
      const route = `employee/${redirectToEditEmployee}`;
      return (
        <Redirect to={route}/>
      );
    }
  }

  function handleChangePage(event, newPage) {
    setPage(newPage);
  }

  function handleChangeRowsPerPage(event) {
    setRowsPerPage(+event.target.value);
    setPage(0);
  }

  function onInputChange(event: Event, value: string, row, key) {
    event.stopPropagation();
    row[key] = value;
    setSelectedEmployee({...row});
  }

  function getCellBody(headCell, row) {
    if (rowBeingEdited === row[props.dataKey]) {
      return (
        <React.Fragment>
          <TextField label={headCell.title}
                     type="text"
                     placeholder={headCell.title}
                     className={classes.textField}
                     name={headCell.key}
                     value={row[headCell.key]}
                     onChange={event => onInputChange(event, event.target.value, row, headCell.key)}
                     margin="normal"/>
        </React.Fragment>
      );
    } else {
      return (
        <React.Fragment>
          {row[headCell.key]}
        </React.Fragment>
      );
    }
  }

  function getAction(row) {
    if (rowBeingEdited === row[props.dataKey]) {
      return (
        <React.Fragment>
          <CheckIcon className={classes.icon} onClick={(event) => onSaveClick(event)}/>
          <ClearIcon className={classes.icon} onClick={(event) => onClearClick(event)}/>
        </React.Fragment>
      );
    } else {
      return (
        <React.Fragment>
          <EditIcon className={classes.icon} onClick={(event) => onEditClick(event, row)}/>
          <DeleteIcon className={classes.icon} onClick={(event) => onDeleteClick(event, row)}/>
        </React.Fragment>
      );
    }
  }

  return (
    <React.Fragment>
      {returnRedirect()}
      <div className={classes.tableWrapper}>
        <Table
          className={classes.table}
          aria-labelledby="tableTitle">
          <SharedTableHead order={order}
                           orderBy={orderBy}
                           headCells={props.headCells}
                           onRequestSort={handleRequestSort}
                           rowCount={employeeData.length}
          />
          <TableBody>
            {employeeData
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map(row => {
                return (
                  <StyledTableRow
                    key={row[props.dataKey]}
                    hover
                    onClick={event => handleClick(event, row[props.dataKey])}
                    role="checkbox"
                    tabIndex={-1}>
                    <StyledTableCell className={classes.action}>
                      {getAction(row)}
                    </StyledTableCell>
                    {props.headCells.map(headCell => (
                      <StyledTableCell component="th"
                                       scope="row"
                                       padding="none"
                                       key={headCell.key}>
                        {getCellBody(headCell, row)}
                      </StyledTableCell>
                    ))}
                  </StyledTableRow>
                );
              })}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10]}
          component="div"
          count={employeeData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          backIconButtonProps={{
            'aria-label': 'previous page'
          }}
          nextIconButtonProps={{
            'aria-label': 'next page'
          }}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
        <Dialog open={openDialog}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description">
          <DialogTitle id="alert-dialog-title">{props.dialog.title}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {props.dialog.message}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button color="primary" autoFocus
                    onClick={onDialogCancelClick}>
              No
            </Button>
            <Button color="primary"
                    onClick={onDialogConfirmClick}>
              Yes
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </React.Fragment>
  );
};

SharedTable.propTypes = {
  data: PropTypes.array,
  dataKey: PropTypes.string,
  dialog: PropTypes.object,
  defaultSortOrder: PropTypes.string,
  defaultSortField: PropTypes.string,
  headCells: PropTypes.array,
  handleSave: PropTypes.func,
  handleDeleteClick: PropTypes.func
};

export default SharedTable;