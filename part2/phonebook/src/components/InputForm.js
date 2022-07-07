export const InputForm = ({
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
      number:{' '}
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
