import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import PropTypes from "prop-types";
import React from "react";
import {makeStyles, withStyles} from '@material-ui/core';
import TableCell from "@material-ui/core/TableCell";
import TableSortLabel from "@material-ui/core/TableSortLabel";

const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    paddingLeft: 0,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableSortLabel = withStyles(theme => ({
  root: {
    color: '#fff'
  },
  icon: {
    color: '#fff !important'
  }
}))(TableSortLabel);

const useStyles = makeStyles(theme => ({
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
  action: {
    width: 80,
    paddingLeft: 12
  },
  sortLabel: {
    color: '#fff !important'
  }
}));

const SharedTableHead = (props) => {
  const classes = useStyles();
  const {order, orderBy, onRequestSort} = props;
  const createSortHandler = property => event => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <StyledTableCell className={classes.action}>Action</StyledTableCell>
        {props.headCells.map(headCell => (
          <StyledTableCell
            key={headCell.key}
            sortDirection={orderBy === headCell.key ? order : false}>
            <StyledTableSortLabel
              className={classes.sortLabel}
              active={orderBy === headCell.key}
              direction={order}
              onClick={createSortHandler(headCell.key)}>
              {headCell.label}
              {orderBy === headCell.key ? (
                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null}
            </StyledTableSortLabel>
          </StyledTableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

SharedTableHead.propTypes = {
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  headCells: PropTypes.array.isRequired
};

export default SharedTableHead;
