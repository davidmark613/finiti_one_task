import clsx from "clsx";
import { useState } from "react";
import { Input } from "../../ui/Input/Input";
import { Button } from "../../ui/Button/Button";
import classes from "./TodoFilters.module.css";

const buttons = [
  { name: "all", label: "All" },
  { name: "active", label: "Active" },
  { name: "done", label: "Done" },
];

export const TodoFilters = ({ filter, onStatusChange, onDateChange }) => {
  const [date, setDate] = useState({ startDate: "", endDate: "" });

  const changeHandler = (e) => {
    setDate({ ...date, [e.target.name]: e.target.value });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if (date.startDate && date.endDate) {
      onDateChange(date);
      setDate({ startDate: "", endDate: "" });
    }
  };

  return (
    <div className={classes.todoFilterContainer}>
      <div className={classes.todoStatusFilter}>
        {buttons.map(({ name, label }) => (
          <Button
            key={name}
            type="button"
            label={label}
            onClick={() => onStatusChange(name)}
            className={clsx({
              [classes.button]: true,
              [classes.active]: filter === name,
            })}
          />
        ))}
      </div>
      <form className={classes.todoDateFilter} onSubmit={submitHandler}>
        <Input
          htmlFor="startDate"
          label="Start Date:"
          id="startDate"
          name="startDate"
          type="date"
          value={date.startDate}
          className={classes.dateInput}
          containerClasses={classes.dateInputContainer}
          onChange={changeHandler}
        />
        <Input
          htmlFor="endtDate"
          label="End Date:"
          id="endDate"
          name="endDate"
          type="date"
          value={date.endDate}
          className={classes.dateInput}
          containerClasses={classes.dateInputContainer}
          onChange={changeHandler}
        />
        <Button type="submit" label="Submit" className={classes.dateButton} />
      </form>
    </div>
  );
};
