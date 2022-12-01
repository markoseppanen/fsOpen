import React, { useEffect, useState } from 'react';

import { Filter } from './components/Filter';
import { InputForm } from './components/InputForm';
import { NameList } from './components/Namelist';
import { Notification } from './components/Notification';
import { Error } from './components/Error';
import * as Persons from './services/Persons';
import './index.css';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [showAll, setShowAll] = useState(true);
  const [filter, setFilter] = useState('');
  const [notificationMessage, setNotificationMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    Persons.getAllPersons().then(persons => setPersons(persons));
  }, []);

  const addPerson = event => {
    event.preventDefault();

    const newPerson = {
      name: newName,
      number: newNumber,
    };

    if (persons.some(person => person.name === newPerson.name)) {
      const person = persons.find(person => person.name === newPerson.name);
      console.log('Person exists:', person);
      if (
        window.confirm(
          `${newName.trim()} is already added to phonebook, do you want update the number?`
        )
      ) {
        Persons.updatePerson(person.id, newPerson).catch(e => {
          setErrorMessage(`${newPerson.name} already deleted from the server`);
          setTimeout(() => {
            setErrorMessage(null);
          }, 5000);
        });
        setPersons(
          persons.map(person => {
            if (person.name === newPerson.name) {
              return { ...person, number: newPerson.number };
            }
            return person;
          })
        );
      }
    } else {
      Persons.addPerson(newPerson).then(person =>
        setPersons(persons.concat(person))
      );

      setNotificationMessage(`Added ${newName}`);
      setTimeout(() => {
        setNotificationMessage(null);
      }, 5000);

      setNewName('');
      setNewNumber('');
    }
  };

  const deletePerson = id => {
    const person = persons.find(person => person.id === id);

    if (window.confirm(`Are you sure you want to delete ${person.name}`)) {
      Persons.deletePerson(id);
      setPersons(persons.filter(person => person.id !== id));
    }
  };

  const handleFilterChange = event => {
    setFilter(event.target.value);
    event.target.value === '' ? setShowAll(true) : setShowAll(false);
  };

  const handleNameChange = event => {
    setNewName(event.target.value);
  };

  const handleNumberChange = event => {
    setNewNumber(event.target.value);
  };

  const filteredList = showAll
    ? persons
    : persons.filter(person =>
        person.name.toLowerCase().includes(filter.toLowerCase())
      );

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notificationMessage} />
      <Error message={errorMessage} />
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      <h3>Add new</h3>
      <InputForm
        addPerson={addPerson}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        newName={newName}
        newNumber={newNumber}
      />
      <h3>Numbers</h3>
      <NameList filteredList={filteredList} deletePerson={deletePerson} />
    </div>
  );
};

export default App;
