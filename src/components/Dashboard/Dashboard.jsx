import React from 'react';
import { HeadTitle, PasswordPageWrapper } from './PasswordManager.styled';
import { Filter } from '../Filter/Filter';
import { PasswordList } from '../PasswordList/PasswordList';
import { PasswordForm } from '../PasswordForm/PasswordForm';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectAllPasswords } from '../../Redux/contactsSelectors';
import { addPassword, fetchPasswords } from '../../Redux/contactsOperations';
import toast, { Toaster } from 'react-hot-toast';

import { useEffect } from 'react';

const Dashboard = () => {
  const [filter, setFilter] = useState('');

  const dispatch = useDispatch();
  const items = useSelector(selectAllPasswords);

  useEffect(() => {
    dispatch(fetchPasswords());
  }, [dispatch]);

  const handleSubmit = async (e, { resetForm }) => {
    try {
      if (items.find(el => el.name.toLowerCase() === e.name.toLowerCase())) {
        toast.error(`${e.name} is already in passwords.`);
      } else {
        const newPassword = {
          name: e.name,
          number: e.pass,
        };

        await dispatch(addPassword(newPassword));
      }
    } catch (error) {
      toast.error(`${error.message}`);
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
      <Toaster />
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
