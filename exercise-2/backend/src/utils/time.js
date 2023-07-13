const getNow = () =>
  new Date().getHours() +
  ":" +
  new Date().getMinutes() +
  ":" +
  new Date().getSeconds();

export { getNow };
