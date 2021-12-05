import { Weather } from "./Weather";

export const SingleCountry = ({ country }) => (
  <figure>
    <h2>{country.name.common}</h2>
    <p>
      Capital: {country.capital} <br />
      Population: {country.population.toLocaleString("en")}
    </p>
    <h3>Languages:</h3>
    <ul>
      {Object.values(country.languages).map((lang, idx) => {
        return <li key={idx}>{lang}</li>;
      })}{" "}
    </ul>
    <img
      src={country.flags.png}
      alt={`Flag of ${country.name.common}`}
      title={`Flag of ${country.name.common}`}
    />
    <Weather capital={country.capital} countryCode={country.cca2} />
  </figure>
);
