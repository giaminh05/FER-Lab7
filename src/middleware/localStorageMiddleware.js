export const localStorageMiddleware = (store) => (next) => (action) => {
  if (action.type === "films/setFilmsID") {
    const flims = action.payload;
    localStorage.setItem("flims", JSON.stringify(flims));
  }
  return next(action);
};
