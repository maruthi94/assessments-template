import React from 'react';
import { Country } from '../common/models';

export function EmptyCountryDetails() {
  return <h3>Select the country from the list to view the details.</h3>;
}

export function CountryDetails({ name, capital, languages, population, flag }: Country) {
  const languagesAsString = languages.map(l => l.name).join(', ');
  return (
    <div>
      <img src={flag} alt="Country flag" width="280" height="180" />
      <div>
        <p>
          <b>Name:</b> {name}
        </p>
        <p>
          <b>Capital:</b> {capital}
        </p>
        <p>
          <b>Population:</b> {population}
        </p>
        <p>
          <b>Languages:</b> {languagesAsString}
        </p>
      </div>
    </div>
  );
}
