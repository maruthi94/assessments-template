import { ActionType } from './actions';
import { AppAction, AppState, SortOrder } from '../common/models';

const deriveSortOrder = (sortOrder: SortOrder) => {
  switch (sortOrder) {
    case SortOrder.Ascending:
      return SortOrder.Descending;
    case SortOrder.Descending:
      return SortOrder.Default;
    case SortOrder.Default:
      return SortOrder.Ascending;
  }
};

export function countryListReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case ActionType.StoreCountryList:
      const countryList = action.payload;
      return {
        ...state,
        countryList: [...countryList]
      };
    case ActionType.UpdateSortOrder:
      return {
        ...state,
        sortOrder: deriveSortOrder(state.sortOrder)
      };
    case ActionType.UpdateFilterText:
      return {
        ...state,
        filterText: action.payload
      };
    case ActionType.UpdateSelectedCountry:
      return {
        ...state,
        selectedCountry: { ...action.payload }
      };
    default:
      return state;
  }
}
