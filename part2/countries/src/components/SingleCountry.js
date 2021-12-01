export const SingleCountry = ({ country }) => {
  return (
    <figure>
      <h2>{country.name.common}</h2>
      <p>
        Capital: {country.capital} <br />
        Population: {country.population}
      </p>
      <h3>Languages:</h3>
      <ul>
        {Object.values(country.languages).map((lang, idx) => {
          console.log(lang);
          return <li key={idx}>{lang}</li>;
        })}{" "}
      </ul>
      <img src={country.flags.png} alt={`Flag of ${country.name.common}`} />
    </figure>
  );
};
