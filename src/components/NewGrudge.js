import React, { useState } from 'react';

const NewGrudge = ({ onSubmit }) => {
  const [person, setPerson] = useState('');
  const [reason, setReason] = useState('');

  const handleChange = (event) => {
    event.preventDefault();
    onSubmit({ person, reason });
    setPerson('');
    setReason('');
  };

  return (
    <form className="NewGrudge" onSubmit={handleChange}>
      <input
        className="NewGrudge-input"
        placeholder="Person"
        type="text"
        value={person}
        onChange={(event) => setPerson(event.target.value)}
      />
      <input
        className="NewGrudge-input"
        placeholder="Reason"
        type="text"
        value={reason}
        onChange={(event) => setReason(event.target.value)}
      />
      <input
        className="NewGrudge-submit button"
        disabled={!person || !reason}
        type="submit"
      />
    </form>
  );
};

export default NewGrudge;
