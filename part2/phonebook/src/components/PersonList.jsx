export const PersonList = ({ persons, removePerson }) => (
  <>
    <h2>Numbers</h2>
    {persons.map((person) => (
      <p key={person.id}>
        {person.name} {person.number}{" "}
        <button onClick={() => removePerson(person.id)}>🗑️ Delete</button>
      </p>
    ))}
  </>
);
