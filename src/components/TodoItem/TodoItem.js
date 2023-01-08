import clsx from "clsx";
import moment from "moment";
import { Button } from "../../ui/Button/Button";
import classes from "./TodoItem.module.css";

export const TodoItem = ({ onDelete, onClickEdit, status, label, date }) => (
  <div className={classes.todoItem}>
    <div className={classes.todoItemContent}>
      <div className={classes.todoItemStatusContainer}>
        <span
          className={clsx({
            [classes.todoItemStatus]: true,
            [classes.statusDone]: status === "done",
          })}
        >
          {status}
        </span>
      </div>
      <span className={classes.todoItemLabel}>{label}</span>
      <span className={classes.todoItemDate}>
        {moment(date).format("MMM Do YYYY")}
      </span>
    </div>
    <div className={classes.todoItemActions}>
      <Button
        type="button"
        label="Edit"
        className={classes.button}
        onClick={onClickEdit}
      />
      <Button
        type="button"
        label="Delete"
        className={clsx(classes.button, classes.cancelButton)}
        onClick={onDelete}
      />
    </div>
  </div>
);
