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

    const newPerson = {
      name: newName,
      number: newNumber,
    };

    if (persons.some(person => person.name === newPerson.name)) {
      const person = persons.find(person => person.name === newPerson.name);
      console.log('Person exists:', person);
      if (
        window.confirm(
          `${newName} is already added to phonebook, do you want update the number?` // Doesn't work if there is extra whitespace, needs whitespace removal
        )
      ) {
        Persons.updatePerson(person.id, newPerson);
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
