import classes from "./TodoResults.module.css";

export const TodoResults = ({ todos }) => {
  const calculateDone = () => {
    return todos.reduce((acc, currValue) => {
      if (currValue.status === "done") acc++;
      return acc;
    }, 0);
  };

  const calculateActive = () => {
    return todos.reduce((acc, currValue) => {
      if (currValue.status === "active") acc++;
      return acc;
    }, 0);
  };

  return (
    <div className={classes.todosResults}>
      <div className={classes.todosResultsContainer}>
        <div className={classes.todoLabelContainer}>
          <span className={classes.todoLabel}>Total Tasks</span>
        </div>
        <div className={classes.todoValueContainer}>
          <span className={classes.todoValue}>{todos.length}</span>
        </div>
      </div>
      <div className={classes.todosResultsContainer}>
        <div className={classes.todoLabelContainer}>
          <span className={classes.todoLabel}>Tasks Completed</span>
        </div>
        <div className={classes.todoValueContainer}>
          <span className={classes.todoValue}>{calculateDone()}</span>
        </div>
      </div>
      <div className={classes.todosResultsContainer}>
        <div className={classes.todoLabelContainer}>
          <span className={classes.todoLabel}>Tasks Remaining</span>
        </div>
        <div className={classes.todoValueContainer}>
          <span className={classes.todoValue}>{calculateActive()}</span>
        </div>
      </div>
    </div>
  );
};
