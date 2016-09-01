import React, { Component } from 'react';
import DataTable from './DataTable';
import PrimaryFilters from './PrimaryFilters';
import FilterLabels from './FilterLabels'
import _ from 'lodash';
var qs = require('qs');

export default class App extends Component {
  constructor() {
    super();

    this.state = {
      destinations: [],
      filters: {},
      locationValue: "",
      sort_by: ["safety_score", "desc"]
    };

    this.applyFilters = this.applyFilters.bind(this);
    this.applySortBy = this.applySortBy.bind(this);
    this.fetchDestinations = this.fetchDestinations.bind(this);

  }

  componentDidMount() {
    this.fetchDestinations();
  }

  fetchDestinations() {
    const sortByQS = {sort_by: this.state.sort_by[0] + '.' + this.state.sort_by[1]};
    const querystring = qs.stringify({...this.state.filters, ...sortByQS},
      {arrayFormat: 'repeat'});
    fetch('http://127.0.0.1:5000/destinations' + '?' + querystring).then((response) => {
      return response.json()
    }).then((response_json) => {
      this.setState({destinations: response_json.destinations});
    })
  }

  applyFilters(filters) {
    const newFilters = _.omitBy({...this.state.filters, ...filters}, _.isNull);
    this.setState({filters: newFilters}, this.fetchDestinations)
  }

  applySortBy(sort_by) {
    console.log(sort_by);
    this.setState({sort_by: sort_by}, this.fetchDestinations)
  }

  render() {
    return (
      <div id="container" className="container">
        <h1>Journey Generator</h1>
        <div>
          <PrimaryFilters
            filters={this.state.filters}
            applyFilters={this.applyFilters}
          />
        </div>
        <div>
          {!_.isEmpty(_.omit(this.state.filters, ["city_id", "continent", "country_code"])) ?
            <FilterLabels
              filters={_.omit(this.state.filters, ["city_id", "continent", "country_code"])}
            />
            : null}
          {!_.isEmpty(this.state.destinations) ?
            <DataTable
              applySortBy={this.applySortBy}
              destinations={this.state.destinations}
              sort_by={this.state.sort_by}
            />
            : null}
        </div>
      </div>
    );
  }
};
