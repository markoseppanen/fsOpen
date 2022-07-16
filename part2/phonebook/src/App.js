import React, { useEffect, useState } from 'react';

import { Filter } from './components/Filter';
import { InputForm } from './components/InputForm';
import { NameList } from './components/Namelist';
import * as Persons from './services/Persons';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [showAll, setShowAll] = useState(true);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    Persons.getAllPersons().then(persons => setPersons(persons));
  }, []);

  const addPerson = event => {
    event.preventDefault();

    if (persons.some(person => person.name === newName)) {
      window.alert(`${newName} is already added to phonebook`);
    } else {
      Persons.addPerson({
        name: newName,
        number: newNumber,
      }).then(person => setPersons(persons.concat(person)));

      setNewName('');
      setNewNumber('');
    }
  };

  const deletePerson = id => {
    const person = persons.filter(person => person.id === id).pop();

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
