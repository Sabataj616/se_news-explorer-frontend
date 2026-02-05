export const formatDateForAPI = (dateString) => {
  const date = new Date(dateString);
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return date.toLocaleDateString("en-US", options);
};


export const getDateRange = () => {
  const today = new Date();
  const weekAgo = new Date();
  weekAgo.setDate(today.getDate() - 7);

  return {
    from: formatDateForAPI(weekAgo),
    to: formatDateForAPI(today),
  };
};
