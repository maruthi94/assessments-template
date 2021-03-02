import React, { useContext } from 'react';
import { ActionType } from '../store/actions';
import { Country, SortOrder } from '../common/models';
import { StoreContext } from '../store';
export default function CountryList() {
  const { state, dispatch } = useContext(StoreContext);

  const sortList = (countryList: Country[]) => {
    let sortedList = countryList;
    switch (state.sortOrder) {
      case SortOrder.Ascending:
        sortedList = countryList.sort((a, b) => a.population - b.population);
        break;
      case SortOrder.Descending:
        sortedList = countryList.sort((a, b) => b.population - a.population);
        break;
    }
    return sortedList;
  };
  const filteredCountryList: Country[] = sortList(
    state.countryList.filter(
      (c: Country) =>
        c.name?.toLowerCase().includes(state.filterText.toLowerCase()) ||
        c.numericCode?.toLowerCase().includes(state.filterText.toLowerCase())
    )
  );

  return (
    <div className="country-list-container">
      <button
        className={`country-list-header ${state.sortOrder}`}
        data-testid="country-list-header"
        onClick={() => dispatch({ type: ActionType.UpdateSortOrder })}
      >
        List of Countries
      </button>
      <ul className="country-list" data-testid="country-list">
        {filteredCountryList.map(country => (
          <li
            className={`country-list-item ${
              country.name === state.selectedCountry?.name ? 'active' : ''
            }`}
            key={country.numericCode}
            onClick={_ => dispatch({ type: ActionType.UpdateSelectedCountry, payload: country })}
          >
            {country.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
