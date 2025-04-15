import { useState, useEffect } from 'react'
import { Results } from './components/Results'
import { FindCountries } from './components/FindCountries'

const App = () => {
  const [countriesList, setCountriesList] = useState([])
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    fetch('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then((response) => response.json())
      .then((data) => setCountriesList(data))
      .catch((error) => console.error('Error fetching countries:', error))
  }, [])

  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value)
  }

  const filteredList = countriesList.filter((country) =>
    country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <>
      <FindCountries
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        handleSearchTermChange={handleSearchTermChange}
      />
      <Results countryList={filteredList} setSearchTerm={setSearchTerm} />
    </>
  )
}

export default App
