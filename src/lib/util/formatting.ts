const formatDateRange = (start: string, end: string) => {
  const format = (dateStr: string) => {
    const date = new Date(dateStr);
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hour = String(date.getHours()).padStart(2, '0');
    const minute = String(date.getMinutes()).padStart(2, '0');
    return `${month}/${day} ${hour}:${minute}`;
  };

  return `${format(start)} ~ ${format(end)}`;
};

const format = { formatDateRange };

export default format;
