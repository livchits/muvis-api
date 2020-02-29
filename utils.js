function formatDate(dateString) {
  const options = { month: 'long', day: 'numeric', year: 'numeric' };
  const date = new Date(dateString);
  const formatedDate = new Intl.DateTimeFormat('en-US', options).format(date);
  return formatedDate;
}
