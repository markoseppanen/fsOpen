import { MultipleCountries } from './MultipleCountries'
import { SingleCountry } from './SingleCountry'

export const Results = ({ countryList, setSearchTerm }) => {
  if (countryList.length > 10) {
    return <p>too many Countries</p>
  }
  if (countryList.length <= 10 && countryList.length > 1) {
    return <MultipleCountries countryList={countryList} setSearchTerm={setSearchTerm}/>
  }
  if (countryList.length === 1) {
    return (
      <SingleCountry country={countryList[0]}  />
    )
  }
}
