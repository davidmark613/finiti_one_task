import classes from './Snackbar.module.css';

export const Snackbar = props => {
  return <div className={classes.snackbar}>{props.message}</div>;
};