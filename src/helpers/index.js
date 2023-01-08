import moment from "moment";

export const checkDateForRemove = (createdDate, endDate) => {
  const diffInDays = moment(endDate).diff(moment(createdDate), "days");
  if (diffInDays > 6) {
    return false;
  }

  return true;
};

export const sortTodos = (todos, data) => {
  const { order, field } = data;
  let sorted = [];
  if (field === "date") {
    if (order === "asc") {
      sorted = [...todos].sort(
        (a, b) => new Date(a[field]) - new Date(b[field])
      );
    } else {
      sorted = [...todos].sort(
        (a, b) => new Date(b[field]) - new Date(a[field])
      );
    }
  }

  if (field === "label") {
    if (order === "asc") {
      sorted = [...todos].sort(
        (a, b) => a[field].localeCompare(b[field])
      );
    } else {
      sorted = [...todos].sort(
        (a, b) => b[field].localeCompare(a[field])
      );
    }
  }

  return sorted;
};
