import React from 'react';
import { HeadTitle, PasswordPageWrapper } from './PasswordManager.styled';
import { Filter } from '../Filter/Filter';
import { PasswordList } from '../PasswordList/PasswordList';
import { PasswordForm } from '../PasswordForm/PasswordForm';
import { useGetPasswordsQuery, useAddPasswordMutation } from '../store';
import PropTypes from 'prop-types';
import { useState } from 'react';

const Dashboard = () => {
  const [filter, setFilter] = useState('');

  const { data: items } = useGetPasswordsQuery();
  const [addPassword] = useAddPasswordMutation();

  const handleSubmit = async (e, { resetForm }) => {
    try {
      if (
        await items.find(el =>
          el.name.toLowerCase().includes(e.name.toLowerCase())
        )
      ) {
        alert(`${e.name} is already in passwords.`);
      } else {
        const newPassword = {
          name: e.name,
          number: e.pass,
        };

        await addPassword(newPassword);
      }
    } catch (error) {
      alert(error.message);
    }

    resetForm();
  };

  const handleFilter = e => {
    setFilter(e);
  };

  const getVisiblePasswords = () => {
    let result;
    if (items) {
      result = items.filter(el =>
        el.name.toLowerCase().includes(filter.toLowerCase())
      );
    } else {
      result = items;
    }

    return result;
  };

  const visiblePasswords = getVisiblePasswords();

  return (
    <PasswordPageWrapper>
      <HeadTitle>Add Password</HeadTitle>

      <PasswordForm onSubmit={handleSubmit} />
      <HeadTitle>Passwords</HeadTitle>

      <Filter filterState={filter} handleFilter={handleFilter} />

      {items && <PasswordList filteredArr={visiblePasswords} />}
    </PasswordPageWrapper>
  );
};

PasswordForm.propTypes = {
  initialValues: PropTypes.object,
  onSubmit: PropTypes.func,
};

Filter.propTypes = {
  passwords: PropTypes.array,
  filterState: PropTypes.string,
  handleFilter: PropTypes.func,
};

PasswordList.propTypes = {
  filteredArr: PropTypes.array,
};

export default Dashboard;
