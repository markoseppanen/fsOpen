export const Filter = ({ filter, handleFilterChange }) => (
  <form>
    filter shown with: <input value={filter} onChange={handleFilterChange} />
  </form>
);
