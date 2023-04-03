import React, { useState, useEffect } from 'react';
import Phonebook from './Phonebook/Phonebook';
import Contactlist from './Contacts/Contactlist';
import Filter from './Contacts/Filter';
import css from './styles/Phonebook.module.css';
import { nanoid } from 'nanoid';

const STORAGE_KEY = 'contact';

export const App = () => {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');

   useEffect(() => {
    const localData = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (localData) {
      setContacts(localData);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(contacts));
  }, [contacts]);

  const phonebookSubmitHandler = (name, number) => {
    const newContact = { id: nanoid(), name, number };
    if (isThisContactExist(name)) {
      alert(`${name} is already exist!`);
    } else {
      setContacts([...contacts, newContact]);
    }
  };

  const isThisContactExist = data => {
    return contacts.find(
      contact => contact.name.toLowerCase() === data.toLowerCase()
    );
  };

  const filterChange = evt => {
    setFilter(evt.target.value);
  };

  const getFilteredValue = () => {
    if (!filter) return contacts;
    return contacts.filter(({ name }) => {
      return name.toLowerCase().includes(filter.toLowerCase());
    });
  };

  const removeContact = evt => {
    setContacts(contacts.filter(contact => contact.id !== evt.target.name));
  };

  const filteredContacts = getFilteredValue();

  return (
    <div className={css.form_field}>
      <h1 className={css.heading}>Phonebook</h1>
      <Phonebook onSubmit={phonebookSubmitHandler}></Phonebook>
      <h2 сlassName={css.sub_heading}>Contacts</h2>
      <Filter onType={filterChange} filter={filter}></Filter>
      <Contactlist
        contacts={getFilteredValue()}
        onDelete={removeContact}
      ></Contactlist>
    </div>
  );
}
