import { useState } from "react";
import { Button } from "../../ui/Button/Button";
import classes from "./TodoListHeader.module.css";

export const TodoListHeader = ({ onOpen, onHandleSort }) => {
  const [sortOrder, setSortOrder] = useState("asc");

  const handleClick = (field) => {
    let order = sortOrder === "asc" ? "desc" : "asc";
    onHandleSort({ order, field });
    setSortOrder(order);
  };

  return (
    <div className={classes.todosHeader}>
      <div className={classes.todosSubHeaders}>
        <div className={classes.todosStatus}>
          <Button label="Status" className={classes.sortButton} />
        </div>
        <div className={classes.todosName}>
          <Button
            label="Name"
            className={classes.sortButton}
            onClick={() => handleClick("label")}
          />
        </div>
        <div className={classes.todosDate}>
          <Button
            label="Date"
            className={classes.sortButton}
            onClick={() => handleClick("date")}
          />
        </div>
      </div>
      <div className={classes.todosActions}>
        <Button
          type="button"
          label="New Task"
          className={classes.button}
          onClick={() => onOpen()}
        />
      </div>
    </div>
  );
};
