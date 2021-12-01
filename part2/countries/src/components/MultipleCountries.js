export const MultipleCountries = ({ countryList, setCountryFilter }) => {
  return countryList.map((country) => {
    console.log("Multiple countries-single", country);
    console.log(country.cca2);
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
