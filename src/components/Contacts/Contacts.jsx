import React from 'react';
import { HeadTitle } from './PhoneBook.styled';
import { Filter } from '../Filter/Filter';
import { ContactList } from '../ContactList/ContactList';
import { ContactForm } from '../ContactForm/ContactForm';
import { useGetContactsQuery, useAddContactMutation } from '../store';
import PropTypes from 'prop-types';
import { useState } from 'react';

const Contacts = () => {
  const [name] = useState('');
  const [number] = useState('');
  const [filter, setFilter] = useState('');

  const { data: items } = useGetContactsQuery();
  const [addContact] = useAddContactMutation();

  const handleSubmit = async (e, { resetForm }) => {
    try {
      if (
        await items.find(el =>
          el.name.toLowerCase().includes(e.name.toLowerCase())
        )
      ) {
        alert(`${e.name} is already in contacts.`);
      } else {
        const newContact = {
          name: e.name,
          number: e.number,
        };

        await addContact(newContact);
      }
    } catch (error) {
      alert(error.message);
    }

    resetForm();
  };

  const handleFilter = e => {
    setFilter(e);
  };

  const getVisibleContacts = () => {
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

  const visibleContacts = getVisibleContacts();

  return (
    <>

      <HeadTitle>Phonebook</HeadTitle>

      <ContactForm
        initialValues={{ items, name, number }}
        onSubmit={handleSubmit}
      />
      <HeadTitle>Contacts</HeadTitle>

      <Filter filterState={filter} handleFilter={handleFilter} />

      {items && <ContactList filteredArr={visibleContacts} />}
    </>
  );
};

ContactForm.propTypes = {
  initialValues: PropTypes.object,
  onSubmit: PropTypes.func,
};

Filter.propTypes = {
  contacts: PropTypes.array,
  filterState: PropTypes.string,
  handleFilter: PropTypes.func,
};

ContactList.propTypes = {
  filteredArr: PropTypes.array,
};

export default Contacts;
