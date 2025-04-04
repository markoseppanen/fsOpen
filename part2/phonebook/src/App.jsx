import { useState, useEffect } from "react";

import { Filter } from "./components/Filter";
import { InputForm } from "./components/InputForm";
import { PersonList } from "./components/PersonList";
import * as personService from "./services/persons";
import { Notification } from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [notificationMessage, setNotificationMessage] = useState(null);
  const [notificationType, setNotificationType] = useState(null);

  useEffect(() => {
    personService.getAll().then((initialPersons) => setPersons(initialPersons));
  }, []);

  const personsToShow =
    filter === ""
      ? persons
      : persons.filter((person) =>
          person.name.toLowerCase().includes(filter.toLowerCase()),
        );

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const addPerson = (event) => {
    event.preventDefault();
    const newPerson = {
      name: newName,
      number: newNumber,
    };

    if (persons.some((person) => person.name === newName)) {
      if (
        window.confirm(
          `${newName} is already added to phonebook, do you want to replace the old number with a new one?`,
        )
      ) {
        const personId = persons.find((person) => person.name === newName).id;
        personService
          .update(personId, newPerson)
          .then((updatedPerson) => {
            setPersons(
              persons.map((person) =>
                person.id !== personId ? person : updatedPerson,
              ),
            );
            setNewName("");
            setNewNumber("");
            setNotificationMessage(`Updated ${updatedPerson.name}`);
            setNotificationType("success");
            setTimeout(() => {
              setNotificationMessage(null);
              setNotificationType(null);
            }, 5000);
          })
          .catch((_error) => {
            setNotificationMessage(
              `${newName} was already removed from the server.`,
            );
            setNotificationType("error");
            setTimeout(() => {
              setNotificationMessage(null);
              setNotificationType(null);
            }, 5000);
          });
      }
    } else {
      personService.add(newPerson).then((person) => {
        setPersons(persons.concat(person));
        setNewName("");
        setNewNumber("");
        setNotificationMessage(`Added ${person.name}`);
        setNotificationType("success");
        setTimeout(() => {
          setNotificationMessage(null);
          setNotificationType(null);
        }, 5000);
      });
    }
  };

  const removePerson = (id) => {
    const person = persons.find((p) => p.id === id);
    if (window.confirm(`Delete ${person.name}?`)) {
      personService.remove(id).then(() => {
        setPersons(persons.filter((p) => p.id !== id));
      });
    }
  };

  return (
    <div>
      {notificationMessage && (
        <Notification message={notificationMessage} type={notificationType} />
      )}
      <h1>Phonebook</h1>
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      <InputForm
        addPerson={addPerson}
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      />
      <PersonList persons={personsToShow} removePerson={removePerson} />
    </div>
  );
};

export default App;
