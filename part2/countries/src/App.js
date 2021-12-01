import React, { useEffect, useState } from "react";
import axios from "axios";
import { Results } from "./components/Results";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [countryFilter, setCountryFilter] = useState("");

  useEffect(
    () =>
      axios
        .get("https://restcountries.com/v3.1/all")
        .then((r) => setCountries(r.data)),
    []
  );

  const handleFilterChange = (event) => {
    setCountryFilter(event.target.value);
  };

  const filteredList = countries.filter((country) =>
    country.name.common.toLowerCase().includes(countryFilter.toLowerCase())
  );

  return (
    <>
      <main>
        <h1>Countries</h1>
        <form>
          Find countries:{" "}
          <input value={countryFilter} onChange={handleFilterChange} />
        </form>
      </main>
      <Results countryList={filteredList} setCountryFilter={setCountryFilter} />
    </>
  );
};

export default App;
