import React, { useContext } from 'react';
import { StoreContext } from '../store';
import { CountryDetails, EmptyCountryDetails } from './CountryDetails';

export default function CountryDetailsSection() {
  const {
    state: { selectedCountry }
  } = useContext(StoreContext);
  return (
    <section className="country-details">
      {!!selectedCountry ? <CountryDetails {...selectedCountry} /> : <EmptyCountryDetails />}
    </section>
  );
}
