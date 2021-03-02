import { Country } from './models';

export async function fetchCountryList(): Promise<Country[]> {
  const res = await fetch('https://restcountries.eu/rest/v2/all');
  return res.json();
}
