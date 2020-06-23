export const checkEnterKey = (event, executeEnterKeyFunction) => {
  if (event.keyCode === 13) {
    executeEnterKeyFunction();
  }
};
