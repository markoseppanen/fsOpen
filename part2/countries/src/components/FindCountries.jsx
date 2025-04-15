export const FindCountries = ({
  searchTerm,
  setSearchTerm,
  handleSearchTermChange
}) => (
  <p>
    Find countries{' '}
    <input value={searchTerm} onChange={handleSearchTermChange} />{' '}
    <button onClick={() => setSearchTerm('')}>Clear</button>
  </p>
)
