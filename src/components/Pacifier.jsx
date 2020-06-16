import React from 'react';

const Pacifier = ({ show }) => {
  if (!show) return null;
  return (
    <div>
      Pacifier
    </div>
  );
};

export { Pacifier };
