import React from 'react';

import id from 'uuid/v4';

import Grudges from './components/Grudges';
import NewGrudge from './components/NewGrudge';
import UndoRedo from './components/UndoRedo';

import initialGrudgesData from './utils/initialGrudgesData';

import useUndoRedo from './hooks/useUndoRedo';

const Application = () => {
  const {
    state: grudges,
    set: setGrudges,
    undo,
    redo,
    clear,
    canUndo,
    canRedo
  } = useUndoRedo(initialGrudgesData);

  const addGrudge = (grudge) => {
    grudge.id = id();
    grudge.forgiven = false;
    setGrudges([grudge, ...grudges]);
  };

  const toggleForgiveness = (id) => {
    setGrudges(
      grudges.map((grudge) => {
        if (grudge.id !== id) return grudge;
        return { ...grudge, forgiven: !grudge.forgiven };
      })
    );
  };

  return (
    <div className="Application">
      <NewGrudge onSubmit={addGrudge} />
      <UndoRedo
        undo={undo}
        redo={redo}
        clear={clear}
        canRedo={canRedo}
        canUndo={canUndo}
      />
      <Grudges grudges={grudges} onForgive={toggleForgiveness} />
    </div>
  );
};

export default Application;
