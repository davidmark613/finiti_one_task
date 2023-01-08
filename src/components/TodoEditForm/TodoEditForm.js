import clsx from "clsx";
import { useState, useEffect } from "react";
import { Modal } from "../../ui/Modal/Modal";
import { Input } from "../../ui/Input/Input";
import { Button } from "../../ui/Button/Button";
import classes from "./TodoEditForm.module.css";

export const TodoEditForm = ({ todo, onClose, onEditTask }) => {
  const [taskName, setTaskName] = useState("");
  const [taskStatus, setTaskStatus] = useState("");

  useEffect(() => {
    setTaskName(todo.label);
    setTaskStatus(todo.status);
  }, [todo.label, todo.status]);

  const submitHandler = (event) => {
    event.preventDefault();
    if (taskName.length > 0 && taskStatus.length > 0) {
      onEditTask({ label: taskName, status: taskStatus });
      setTaskName("");
      setTaskStatus("");
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
        <h1 className={classes.todoFormHeader}>Edit Task</h1>
        <div className={classes.todoFormInputs}>
          <Input
            type="text"
            value={taskName}
            name="edit-task"
            className={classes.todoFormInput}
            containerClasses={classes.todoFormInputContainer}
            placeholder="Edit task"
            onChange={(e) => setTaskName(e.target.value)}
            onKeyUp={handleKeyUp}
          />
          <select
            required
            className={clsx(classes.todoFormInput, classes.todoFormStatus)}
            onChange={(e) => setTaskStatus(e.target.value)}
            value={taskStatus}
          >
            <option value="">Select Status</option>
            <option value="active">Active</option>
            <option value="done">Done</option>
          </select>
        </div>
        <div className={classes.todoFormActions}>
          <Button type="submit" label="Save" className={classes.button} />
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
