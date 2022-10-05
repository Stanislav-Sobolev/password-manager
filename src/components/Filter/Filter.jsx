import React from 'react';

export const Filter = ({ filterState, handleFilter }) => {
  return (
    <>
      <p>Find contacts by name</p>
      <input
        type="text"
        name="filter"
        value={filterState}
        onChange={e => handleFilter(e.target.value)}
      />
    </>
  );
};
