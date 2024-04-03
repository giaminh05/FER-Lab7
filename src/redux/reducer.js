const initState = {
  flims: [{}],
};

const rootReducer = (state = initState, action) => {
  switch (action.type) {
    case "add/film": {
      const film = action.payload;
      let newState = {};
      const value = Object.assign(film, {});
      newState = {
        ...state,
        film: { ...value },
      };
      return newState;
    }
    case "playPause/film": {
      const { toggle } = action.payload;
      const film = state.film;
      let newState = {};
      const value = Object.assign(film, { play: toggle });
      newState = {
        ...state,
        film: value,
      };
      return newState;
    }

    case "set_flim_id": {
      const { flimId } = action.payload;
      localStorage.setItem("flimId", flimId);
      return { ...state, flimId };
    }

    case "edit_flim_id": {
      const { flimId } = action.payload;
      localStorage.setItem("editFlimId", flimId);
      return { ...state, flimId };
    }

    default:
      return state;
  }
};

export default rootReducer;
