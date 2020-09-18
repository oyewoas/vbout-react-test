import undoRedoActionTypes from './undoRedo.types';

// Initial state that we pass into useReducer
export const initialState = {
  // Array of previous state values updated each time we push a new state
  past: [],
  // Current state value
  present: null,
  // Array of "future" state values if we undo (so we can redo)
  future: []
};

// Our reducer function to handle state changes based on action
export const undoRedoReducer = (state, action) => {
  const { past, present, future } = state;

  switch (action.type) {
    case undoRedoActionTypes.UNDO:
      const previous = past[past.length - 1];
      const newPast = past.slice(0, past.length - 1);

      return {
        past: newPast,
        present: previous,
        future: [present, ...future]
      };
    case undoRedoActionTypes.REDO:
      const next = future[0];
      const newFuture = future.slice(1);

      return {
        past: [...past, present],
        present: next,
        future: newFuture
      };
    case undoRedoActionTypes.SET:
      const { newPresent } = action;

      if (newPresent === present) {
        return state;
      }
      return {
        past: [...past, present],
        present: newPresent,
        future: []
      };
    case undoRedoActionTypes.CLEAR:
      const { initialPresent } = action;

      return {
        ...initialState,
        present: initialPresent
      };
    default:
      return state;
  }
};
