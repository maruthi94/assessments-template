import { ActionType } from "../store/actions";

export interface Currency {
  code: string;
  name: string;
  symbol: string;
}

export interface Language {
  iso639_1: string;
  iso639_2: string;
  name: string;
  nativeName: string;
}

export interface Translations {
  de: string;
  es: string;
  fr: string;
  ja: string;
  it: string;
  br: string;
  pt: string;
  nl: string;
  hr: string;
  fa: string;
}

export interface RegionalBloc {
  acronym: string;
  name: string;
  otherAcronyms: any[];
  otherNames: any[];
}

export interface Country {
  name: string;
  topLevelDomain: string[];
  alpha2Code: string;
  alpha3Code: string;
  callingCodes: string[];
  capital: string;
  altSpellings: string[];
  region: string;
  subregion: string;
  population: number;
  latlng: number[];
  demonym: string;
  area: number;
  gini: number;
  timezones: string[];
  borders: string[];
  nativeName: string;
  numericCode: string;
  currencies: Currency[];
  languages: Language[];
  translations: Translations;
  flag: string;
  regionalBlocs: RegionalBloc[];
  cioc: string;
}

export enum SortOrder {
  Default = 'default',
  Ascending = 'asc',
  Descending = 'desc'
}

export interface AppState {
  countryList: Country[];
  selectedCountry: Country|null;
  sortOrder: SortOrder;
  filterText: string;
}

export interface AppAction{
    type:ActionType;
    payload?:any;
}

export interface AppStoreContext{
    state:AppState;
    dispatch:React.Dispatch<AppAction>;
}