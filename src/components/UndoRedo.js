import React from 'react';

const UndoRedo = ({ undo, redo, clear, canRedo, canUndo }) => {
  return (
    <div className="undoRedo-btn">
      <button onClick={undo} disabled={!canUndo}>
        Undo
      </button>
      <button onClick={redo} disabled={!canRedo}>
        Redo
      </button>
      <button onClick={clear}>Clear</button>
    </div>
  );
};

export default UndoRedo;
