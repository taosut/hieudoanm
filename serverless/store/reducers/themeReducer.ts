import { DARK_THEME, LIGHT_THEME } from '../actions/themeAction';

const themeReducer = (state = { theme: DARK_THEME }, action) => {
  switch (action.theme) {
    case DARK_THEME:
      return { ...state, theme: state.theme };
    case LIGHT_THEME:
      return { ...state, theme: state.theme };
    default:
      return { ...state };
  }
};

export default themeReducer;
