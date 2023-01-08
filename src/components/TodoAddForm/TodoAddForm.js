import clsx from "clsx";
import { useState } from "react";
import { Modal } from "../../ui/Modal/Modal";
import { Input } from "../../ui/Input/Input";
import { Button } from "../../ui/Button/Button";
import classes from "./TodoAddForm.module.css";

export const TodoAddForm = ({ onAdd, onClose }) => {
  const [task, setTask] = useState("");
  const [date, setDate] = useState("");

  const submitHandler = (event) => {
    event.preventDefault();
    if (task.length > 0 && date.length > 0) {
      onAdd({ task, date });
      setTask("");
      setDate("");
      onClose();
    }
  };

  const handleKeyUp = (event) => {
    if (event.keyCode === 13) {
      submitHandler();
    }
  };

  return (
    <Modal onCancel={onClose}>
      <form className={classes.todoForm} onSubmit={submitHandler}>
        <h1 className={classes.todoFormHeader}>Add New Task</h1>
        <div className={classes.todoFormInputs}>
          <Input
            type="text"
            value={task}
            name="add-task"
            className={classes.todoFormInput}
            containerClasses={classes.todoFormInputContainer}
            placeholder="Enter new task"
            onChange={(e) => setTask(e.target.value)}
            onKeyUp={handleKeyUp}
          />
          <Input
            type="date"
            value={date}
            name="date"
            className={clsx(classes.todoFormInput, classes.todoFormDateInput)}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <div className={classes.todoFormActions}>
          <Button type="submit" label="Add" className={classes.button} />
          <Button
            type="button"
            label="Cancel"
            className={clsx(classes.button, classes.cancelButton)}
            onClick={() => onClose()}
          />
        </div>
      </form>
    </Modal>
  );
};
