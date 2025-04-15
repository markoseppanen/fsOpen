export const MultipleCountries = ({ countryList, setSearchTerm }) => (
    <>
      {countryList.map((country) => (
        <p key={country.cca2}>
          {country.name.common}{' '}
          <button onClick={() => setSearchTerm(country.name.common)}>Show</button>
        </p>
      ))}
    </>
  )

