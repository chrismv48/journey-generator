import React, { Component } from 'react';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import { Button } from 'react-bootstrap';
import _ from 'lodash';

const getLocationOptions = () => {
  return fetch('http://127.0.0.1:5000/locations')
    .then((response) => {
      return response.json();
    }).then((json) => {
      return {options: json["locations"]};
    });
};

export default class LocationSelect extends Component {
  constructor(props) {
    super(props);

    this.onLocationSelectChange = this.onLocationSelectChange.bind(this);
  }

  onLocationSelectChange(locationString) {
    const locationFilters = locationString ? this.convertLocationStringToFilters(locationString) : {
      city_id: null,
      continent: null,
      country_code: null
    };
    console.log(locationFilters);
    this.props.applyFilters(locationFilters);
  }

  convertFiltersToLocationString(locationFilters) {
    var locations = [];
    _.forEach(locationFilters, (value, key) => {
      const values = value.replace("in;", "").split(",");
      values.forEach((value) => {
        locations.push(key + '.' + value);
      })
    });
    return locations.join(",")
  }

  getSelectedLocations() {
    return this.convertFiltersToLocationString(this.props.locationFilters);
  }

  convertLocationStringToFilters(locationString) {
    var locationFilters = {};
    locationString.split(",").forEach(location => {
      const [field, value] = location.split(".");
      return _.update(locationFilters, field, (curr_value) => (curr_value || []).concat([value]))
    });

    _.forEach(locationFilters, (value, key) => {
      locationFilters[key] = "in;" + value.join(',')
    });

    return locationFilters
  }

  render() {
    return (
      <div style={{marginTop:24}}>
        <b>
          <Select.Async
            name="location-select"
            simpleValue
            loadOptions={getLocationOptions}
            autoload={false}
            value={this.getSelectedLocations()}
            onChange={this.onLocationSelectChange}
            multi
            placeholder="Filter by cities, countries, or continents!"
          />
        </b>
      </div>
    )
  }
}
