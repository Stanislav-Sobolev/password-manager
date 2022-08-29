import { nanoid } from 'nanoid';
import { HeadTitle } from './PhoneBook.styled';
import { ContactList } from './ContactList';
import { Filter } from './Filter';
import { ContactForm } from './ContactForm';
import PropTypes from 'prop-types';
import { useState } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { addContact, filteredItems, deleteContact } from './store';

export function App() {
  const [name] = useState('');
  const [number] = useState('');

  const items = useSelector(state => state.myContacts.items);
  const filters = useSelector(state => state.myContacts.filters);

  const dispatch = useDispatch();

  const handleSubmit = (e, { resetForm }) => {
    if (
      items.find(el => el.name.toLowerCase().includes(e.name.toLowerCase()))
    ) {
      alert(`${e.name} is already in contacts.`);
    } else {
      const newContact = {
        id: nanoid(),
        name: e.name,
        number: e.number,
      };
      dispatch(addContact(newContact));
    }

    resetForm();
  };

  const handleFilter = e => {
    dispatch(filteredItems(e));
  };

  const getVisibleContacts = () => {
    const filterToLowerCase = filters;

    return items.filter(el =>
      el.name.toLowerCase().includes(filterToLowerCase)
    );
  };

  const visibleContacts = getVisibleContacts();

  return (
    <>
      <HeadTitle>Phonebook</HeadTitle>

      <ContactForm
        initialValues={{ items, filters, name, number }}
        onSubmit={handleSubmit}
      />

      <HeadTitle>Contacts</HeadTitle>

      <Filter
        contacts={items}
        filterState={filters}
        handleFilter={handleFilter}
      />

      <ContactList
        filteredArr={visibleContacts}
        deleteContact={id => dispatch(deleteContact(id))}
      />
    </>
  );
}

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
  deleteContact: PropTypes.func,
};
