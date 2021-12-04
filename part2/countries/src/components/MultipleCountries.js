export const MultipleCountries = ({ countryList, setCountryFilter }) => {
  return countryList.map((country) => {
    return (
      <li key={country.cca2}>
        {country.name.common}{" "}
        <button onClick={() => setCountryFilter(country.name.common)}>
          show
        </button>
      </li>
    );
  });
};
