import { useState, useEffect, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import moment from 'moment';
import { TodoAddForm } from './components/TodoAddForm/TodoAddForm';
import { TodoEditForm } from './components/TodoEditForm/TodoEditForm';
import { TodoResults } from './components/TodoResults/TodoResults';
import { TodoFilters } from './components/TodoFilters/TodoFilters'; 
import { TodoList } from './components/TodoList/TodoList';
import { sortTodos } from './helpers';
import classes from './App.module.css';

const App = () => {
  const [todos, setTodos] = useState([]);
  const [filteredTodos, setFilteredTodos] = useState([]);
  const [open, setOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [todoForEdit, setTodoForEdit] = useState(null);
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState({});

  useEffect(() => {
    const loadedTodos = JSON.parse(localStorage.getItem("todos") || '[]');
    if (loadedTodos.length) {
      setTodos(loadedTodos);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const statusFilterHandler = useCallback((todos, filter) => {
    switch(filter) {
      case 'all':
        return todos;
      case 'active':
        return todos.filter(todo => todo.status !== 'done');
      case 'done':
        return todos.filter(todo => todo.status === 'done');
      default:
        return todos;
    }
  }, []);

  useEffect(() => {
    const filtered = statusFilterHandler(todos, statusFilter);
    setFilteredTodos(filtered);
  }, [statusFilter, todos, statusFilterHandler]);

  const dateFilterHandler = useCallback((todos, filter) => {
    return todos.filter((todo) => moment(todo.date) >= moment(filter.startDate) && moment(todo.date) <= moment(filter.endDate));
  }, []);

  useEffect(() => {
    if (dateFilter.startDate && dateFilter.endDate) {
      const filtered = dateFilterHandler(statusFilterHandler(todos, statusFilter), dateFilter);
      setFilteredTodos(filtered);
    }
  }, [dateFilter, statusFilter, todos, dateFilterHandler, statusFilterHandler]);

  const openFormHandler = () => setOpen(true);

  const closeFormHandler = () => {
    setOpen(false);
    if (isEditMode) {
      setIsEditMode(false);
    }
  };

  const addHandler = todoItem => {
    setTodos(prevTodos => {
      return [
        ...prevTodos,
        {
          id: uuidv4(),
          label: todoItem.task,
          date: todoItem.date,
          createDate: moment().format('YYYY-MM-DD'),
          status: "active",
        },
      ];
    });
  };

  const removeHandler = id => {
    setTodos(prevTodos => {
      return prevTodos.filter(todo => todo.id !== id);
    });
  };

  const editClickHandler = id => {
    const todo = todos.find(todo => todo.id === id);
    setIsEditMode(true);
    setTodoForEdit(todo);
  };

  const editTaskHandler = data => {
    const todoIndex = todos.findIndex(todo => todo.id === todoForEdit.id);
    const currentTodo = todos[todoIndex];
    const updatedTodo = {...currentTodo, label: data.label, status: data.status};
    const updatedTodos = [...todos];
    updatedTodos[todoIndex] = updatedTodo;
    setTodos(updatedTodos);
    setTodoForEdit(null);
  };

  const onFilterStatusChange = (filter) => {
    setStatusFilter(filter);
  };

  const onFilterDateChange = (filter) => {
    setDateFilter(filter);
  };

  const onSortHandler = (data) => {
    if (data && todos.length) {
      const sorted = sortTodos(todos, data);
      setTodos(sorted);
    }
  };

  return (
    <div className={classes.appContainer}>
      {open && <TodoAddForm onAdd={addHandler} onClose={closeFormHandler} />}
      {isEditMode && (
        <TodoEditForm
          todo={todoForEdit}
          onClose={closeFormHandler}
          onEditTask={editTaskHandler}
        />
      )}
        <TodoResults todos={todos} />
        <TodoFilters
          filter={statusFilter}
          onStatusChange={onFilterStatusChange}
          onDateChange={onFilterDateChange}
        />
        <TodoList
          todos={filteredTodos}
          onRemove={removeHandler}
          onOpenForm={openFormHandler}
          onClickEdit={editClickHandler}
          onSortTodos={onSortHandler}
        />
    </div>
  );
}

export default App;
