import React from 'react';
import { act, render, RenderResult } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

jest
  .spyOn(global, 'fetch')
  .mockResolvedValue(
    Promise.resolve({
      json: () => Promise.resolve(require('./testdata/AllContriesResponse.json'))
    } as Response)
  );

describe('<App/>', () => {
  let wrapper: RenderResult;

  beforeEach(async () => {
    await act(async () => {
      wrapper = await render(<App />);
    });
  });

  it('On the load ui is updated with the list of countries', () => {
    const countryList: HTMLElement = wrapper.getByTestId('country-list');
    expect(countryList.children.length).toBe(4);
    expect(wrapper.getByText('List of Countries')).toBeInTheDocument();
  });

  it('should filter country list by name upon entering the name in filter input', () => {
    userEvent.type(wrapper.getByLabelText('Filter'), 'afghan');
    expect(wrapper.getByLabelText('Filter')).toHaveValue('afghan');
    const countryList: HTMLElement = wrapper.getByTestId('country-list');
    expect(countryList.children.length).toBe(1);
    expect(wrapper.getByText('Afghanistan')).toBeInTheDocument();
  });

  it('should filter country list by code upon entering the code in filter input', () => {
    userEvent.type(wrapper.getByLabelText('Filter'), '008');
    expect(wrapper.getByLabelText('Filter')).toHaveValue('008');
    const countryList: HTMLElement = wrapper.getByTestId('country-list');
    expect(countryList.children.length).toBe(1);
    expect(wrapper.getByText('Albania')).toBeInTheDocument();
  });

  it('should sort list by country capital city population ascending upon single click on the list header', () => {
    userEvent.click(wrapper.getByTestId('country-list-header'));
    expect((wrapper.getByTestId('country-list-header') as HTMLElement).className).toContain('asc');
    const countryList: HTMLElement = wrapper.getByTestId('country-list');
    [
      'Åland Islands',
      'Albania',
      'Afghanistan',
      'Algeria'
    ].forEach((name: string, index: number) => {
      expect(countryList.children.item(index)?.innerHTML).toBe(name);
    });
  });

  it('should sort list by country capital city population ascending upon double click on the list header', () => {
    userEvent.dblClick(wrapper.getByTestId('country-list-header'));
    expect((wrapper.getByTestId('country-list-header') as HTMLElement).className).toContain('desc');
    const countryList: HTMLElement = wrapper.getByTestId('country-list');
    [
      'Algeria',
      'Afghanistan',
      'Albania',
      'Åland Islands',
    ].forEach((name: string, index: number) => {
      expect(countryList.children.item(index)?.innerHTML).toBe(name);
    });
  });

  it('should reset sorting of list upon clicking list header three times', () => {
    userEvent.dblClick(wrapper.getByTestId('country-list-header'));
    userEvent.click(wrapper.getByTestId('country-list-header'));

    expect((wrapper.getByTestId('country-list-header') as HTMLElement).className).toContain('default');
    const countryList: HTMLElement = wrapper.getByTestId('country-list');
    [
      'Afghanistan',
      'Åland Islands',
      'Albania',
      'Algeria',
    ].forEach((name: string, index: number) => {
      expect(countryList.children.item(index)?.innerHTML).toBe(name);
    });
    
  });
});
