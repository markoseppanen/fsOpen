import React, { useEffect, useState } from "react";
import axios from "axios";

const Filter = ({ filter, handleFilterChange }) => (
  <form>
    filter shown with: <input value={filter} onChange={handleFilterChange} />
  </form>
);

const InputForm = ({
  addPerson,
  handleNameChange,
  handleNumberChange,
  newName,
  newNumber,
}) => (
  <form onSubmit={addPerson}>
    <div>
      name: <input value={newName} onChange={handleNameChange} />
    </div>
    <div>
      number:{" "}
      <input
        value={newNumber}
        onChange={handleNumberChange}
        type="tel"
        pattern="[0-9\-]+"
      />
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
);

const NameList = ({ filteredList }) => (
  <ul>
    {filteredList.map((person) => (
      <li key={person.id}>
        {person.name} - {person.number}
      </li>
    ))}
  </ul>
);

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [showAll, setShowAll] = useState(true);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    axios.get("http://localhost:3001/persons").then((r) => setPersons(r.data));
  }, []);

  const addPerson = (event) => {
    event.preventDefault();

    if (persons.some((person) => person.name === newName)) {
      window.alert(`${newName} is already added to phonebook`);
    } else {
      setPersons(
        persons.concat({
          id: persons.length + 1,
          name: newName,
          number: newNumber,
        })
      );
      setNewName("");
      setNewNumber("");
    }
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
    event.target.value === "" ? setShowAll(true) : setShowAll(false);
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const filteredList = showAll
    ? persons
    : persons.filter((person) =>
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
      <NameList filteredList={filteredList} />
    </div>
  );
};

export default App;
