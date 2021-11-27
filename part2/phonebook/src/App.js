import React, { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([
    { id: 1, name: "Maija Mallikas", number: "040-11235813" },
    { id: 2, name: "Miro Mallikas", number: "040-31415926" },
    { id: 3, name: "Minni Mallikas", number: "040-48151623" },
  ]);
  const [newName, setNewName] = useState("Mikko Mallikas");
  const [newNumber, setNewNumber] = useState("050-1234567");
  const [showAll, setShowAll] = useState(true);
  const [filter, setFilter] = useState("");

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

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
    event.target.value === "" ? setShowAll(true) : setShowAll(false);
  };

  const filteredList = showAll
    ? persons
    : persons.filter((person) =>
        person.name.toLowerCase().includes(filter.toLowerCase())
      );

  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        filter shown with:{" "}
        <input value={filter} onChange={handleFilterChange} />
      </form>
      <h3>add new</h3>
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
      <h3>Numbers</h3>
      <ul>
        {filteredList.map((person) => (
          <li key={person.id}>
            {person.name} - {person.number}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
