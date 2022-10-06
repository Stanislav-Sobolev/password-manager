import React from 'react';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';

export const Filter = ({ filterState, handleFilter }) => {
  return (
    <>
      <InputLabel>Find website by name</InputLabel>
      <Input
        type="text"
        name="filter"
        value={filterState}
        onChange={e => handleFilter(e.target.value)}
      />
    </>
  );
};
