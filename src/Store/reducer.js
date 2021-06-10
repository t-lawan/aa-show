import { HAS_LOADED, SET_SELECTED_AR_PROJECT } from "./action";

const initalState = {
  has_loaded: false,
  selected_ar_project: null,
  projects: []
};


export const reducer = (state = initalState, action) => {
    switch (action.type) {
      case HAS_LOADED:
        return {
          ...state,
          has_loaded: true,

        };
      case SET_SELECTED_AR_PROJECT:
        return {
          ...state,
          selected_ar_project: action.selected_ar_project,

        };
      default:
        return state;
    }
  };
  
