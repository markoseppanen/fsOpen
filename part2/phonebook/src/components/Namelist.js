export const NameList = ({ deletePerson, filteredList }) => (
  <ul>
    {filteredList.map(person => (
      <li key={person.id}>
        {person.name} - {person.number}{' '}
        <button onClick={() => deletePerson(person.id)}>🗑️ Delete</button>
      </li>
    ))}
  </ul>
);
