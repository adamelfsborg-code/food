export const formatDate = (datetime: Date): string => {
  const date = new Date(datetime);
  const formattedDateTime = date.toLocaleString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true });
  return formattedDateTime
}