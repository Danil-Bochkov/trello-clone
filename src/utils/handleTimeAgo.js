const handleTimeAgo = (timeStr) => {
  const time = new Date(timeStr);
  const now = new Date();
  const diff = (now - time) / 1000; // time difference in seconds

  // calculate time units
  const minutes = Math.round(diff / 60);
  const hours = Math.round(diff / 3600);
  const days = Math.round(diff / 86400);

  // choose the appropriate unit based on the time difference
  if (minutes < 60) {
    return `${minutes} minutes ago`;
  } else if (hours < 24) {
    return `${hours} hours ago`;
  } else {
    return `${days} days ago`;
  }
}

export default handleTimeAgo;