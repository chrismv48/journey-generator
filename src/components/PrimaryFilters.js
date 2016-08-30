import React, { Component } from 'react';
import Select from 'react-select';

require('rc-slider/assets/index.css');
var Rcslider = require('rc-slider');

const getOptions = () => {
  return fetch('http://127.0.0.1:5000/locations')
    .then((response) => {
      return response.json();
    }).then((json) => {
      return {options: json["locations"]};
    });
};

const FilterSelectInput = ({field, applyFilter, placeholder, optionData}) => (
  <FormControl onChange={(e) => applyFilter(field, e.target.value)} componentClass="select" placeholder={placeholder}>
    <option value="" disabled selected>{placeholder}</option>
    {optionData.map((option, i) => (
        <option key={i} value={option.value}>{option.label}</option>
      )
    )}
  </FormControl>
);

export default class PrimaryFilters extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>

      </div>
    )
  }
}
