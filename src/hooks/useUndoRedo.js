import { useCallback, useReducer } from 'react';
import { initialState, undoRedoReducer } from '../reducer/undoRedo.reducer';
import undoRedoActionTypes from '../reducer/undoRedo.types';

// undo/redo Hook
const useUndoRedo = (initialPresent) => {
  const [state, dispatch] = useReducer(undoRedoReducer, {
    ...initialState,
    present: initialPresent
  });

  const canUndo = state.past.length !== 0;
  const canRedo = state.future.length !== 0;

  // Setup callback functions
  // Memoize with useCallback to prevent unnecessary re-renders

  const undo = useCallback(() => {
    if (canUndo) {
      dispatch({ type: undoRedoActionTypes.UNDO });
    }
  }, [canUndo, dispatch]);

  const redo = useCallback(() => {
    if (canRedo) {
      dispatch({ type: undoRedoActionTypes.REDO });
    }
  }, [canRedo, dispatch]);

  const set = useCallback(
    (newPresent) => dispatch({ type: undoRedoActionTypes.SET, newPresent }),
    [dispatch]
  );

  const clear = useCallback(
    () => dispatch({ type: undoRedoActionTypes.CLEAR, initialPresent }),
    [dispatch, initialPresent]
  );

  return { state: state.present, set, undo, redo, clear, canUndo, canRedo };
};

export default useUndoRedo;
