export const addFilm = (data) => {
  return {
    type: "add/film",
    payload: data,
  };
};

export const setPausePlay = (data) => {
  return {
    type: "playPause/film",
    payload: data,
  };
};

export const setFlimId = (flimId) => ({
  type: "set_flim_id",
  payload: { flimId },
});

export const editFlimId = (flimId) => ({
  type: "edit_flim_id",
  payload: { flimId },
});
