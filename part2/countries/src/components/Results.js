import { MultipleCountries } from "./MultipleCountries";
import { SingleCountry } from "./SingleCountry";

export const Results = ({ countryList, setCountryFilter }) => {
  if (countryList.length >= 10) {
    return <p>Too many results, be more specific.</p>;
  } else if (10 > countryList.length && countryList.length > 1) {
    return (
      <ul>
        <MultipleCountries
          countryList={countryList}
          setCountryFilter={setCountryFilter}
        />
      </ul>
    );
  } else if (countryList.length === 1) {
    return <SingleCountry country={countryList.pop()} />;
  } else {
    return <p>No countries found</p>;
  }
};
