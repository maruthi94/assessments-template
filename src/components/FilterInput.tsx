import React, { useContext } from 'react';
import { ActionType } from '../store/actions';
import { StoreContext } from '../store';
export default function FilterInput() {
    const {
      state: { filterText },
      dispatch
    } = useContext(StoreContext);
  
    return (
      <>
        <label htmlFor="filter">Filter</label>
        <input
          name="filter"
          id="filter"
          className="filter-input"
          value={filterText}
          onChange={(e: any) =>
            dispatch({ type: ActionType.UpdateFilterText, payload: e.target.value.trim() })
          }
          placeholder="Enter name or code"
        ></input>
      </>
    );
  }