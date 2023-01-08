import { useState, useEffect } from "react";
import { TodoListHeader } from "../TodoListHeader/TodoListHeader";
import { TodoItem } from "../TodoItem/TodoItem";
import { checkDateForRemove } from "../../helpers";
import classes from "./TodoList.module.css";
import { Snackbar } from "../../ui/Snackbar/Snackbar";

export const TodoList = ({
  todos,
  onRemove,
  onOpenForm,
  onClickEdit,
  onSortTodos,
}) => {
  const [showSnackbar, setShowSnackbar] = useState(false);

  useEffect(() => {
    let timeout;
    if (showSnackbar) {
      timeout = setTimeout(() => {
        setShowSnackbar(false);
      }, 3000);
    }
    return () => clearTimeout(timeout);
  }, [showSnackbar]);

  const handleEditClick = (id) => {
    onClickEdit(id);
  };

  const handleDelete = (id) => {
    const todo = todos.find((item) => item.id === id);
    const isValidForRemove = checkDateForRemove(todo.createDate, todo.date);
    if (isValidForRemove) {
      onRemove(id);
    } else {
      setShowSnackbar(true);
    }
  };

  const handleSort = (sortData) => {
    onSortTodos(sortData);
  };

  return (
    <div className={classes.todoList}>
      <TodoListHeader onOpen={onOpenForm} onHandleSort={handleSort} />
      <div>
        {todos.length ? (
          <div className={classes.todoListContent}>
            {todos.map((todoItem) => (
              <TodoItem
                key={todoItem.id}
                label={todoItem.label}
                date={todoItem.date}
                status={todoItem.status}
                onDelete={() => handleDelete(todoItem.id)}
                onClickEdit={() => handleEditClick(todoItem.id)}
              />
            ))}
          </div>
        ) : (
          <div className={classes.noTodos}>Tasks not found!</div>
        )}
      </div>
      {showSnackbar && (
        <Snackbar message="Task deletion is not possible if its due date is more than 6 days ahead." />
      )}
    </div>
  );
};
