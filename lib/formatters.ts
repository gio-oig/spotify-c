import formatDuration from "format-duration";

export function formatTime(timeInSeconds = 0) {
  return formatDuration(timeInSeconds * 1000);
}

export function fomratDate(date: Date) {
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  return date.toLocaleDateString(undefined, options);
}
