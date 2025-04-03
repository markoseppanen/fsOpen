export const InputForm = ({
  addPerson,
  newName,
  newNumber,
  handleNameChange,
  handleNumberChange,
}) => (
  <>
    <h2>add new</h2>
    <form onSubmit={addPerson}>
      <p>
        name: <input value={newName} onChange={handleNameChange} />
      </p>
      <p>
        number <input value={newNumber} onChange={handleNumberChange} />
      </p>
      <button type="submit">add</button>
    </form>
  </>
);
