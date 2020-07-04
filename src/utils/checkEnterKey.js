export const checkEnterKey = (event, executeEnterKeyFunc) => {
  if (event.keyCode === 13) {
    executeEnterKeyFunc();
  }
};
