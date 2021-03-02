import React, { useEffect, useReducer } from 'react';
import { fetchCountryList } from './common/api';
import { AppState, SortOrder } from './common/models';
import { countryListReducer } from './store/reducer';
import { ActionType } from './store/actions';
import { StoreContext } from './store';
import CountryList from './components/CountryList';
import FilterInput from './components/FilterInput';
import CountryDetailsSection from './components/CountryDetailsSection';
import './App.css';

const initialState: AppState = {
  countryList: [],
  filterText: '',
  selectedCountry: null,
  sortOrder: SortOrder.Default
};

function App() {
  const [state, dispatch] = useReducer(countryListReducer, initialState);

  useEffect(() => {
    fetchCountryList().then(data => dispatch({ type: ActionType.StoreCountryList, payload: data }));
  }, []);

  return (
    <StoreContext.Provider value={{ state, dispatch }}>
      <FilterInput />
      <div className="container">
        <CountryList />
        <CountryDetailsSection />
      </div>
    </StoreContext.Provider>
  );
}

export default App;
