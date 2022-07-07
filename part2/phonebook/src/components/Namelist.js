export const NameList = ({ filteredList }) => (
  <ul>
    {filteredList.map(person => (
      <li key={person.id}>
        {person.name} - {person.number}
      </li>
    ))}
  </ul>
);
