import React, { Component } from 'react';
import DataTable from './DataTable';
import PrimaryFilters from './PrimaryFilters';
import LocationSelect from './LocationSelect';
import update from 'react-addons-update';
import { Grid, Row, Col, FormControl, ControlLabel, FormGroup } from 'react-bootstrap';
import _ from 'lodash';
var qs = require('qs');
require('rc-slider/assets/index.css');
var Rcslider = require('rc-slider');


const months = new Array();
months[0] = "January";
months[1] = "February";
months[2] = "March";
months[3] = "April";
months[4] = "May";
months[5] = "June";
months[6] = "July";
months[7] = "August";
months[8] = "September";
months[9] = "October";
months[10] = "November";
months[11] = "December";

export default class App extends Component {
  constructor() {
    super();

    this.state = {
      destinations: [],
      filters: {month: ["eq;" + months[(new Date).getMonth() + 1].toLowerCase()]},
      sort_by: ["safety_score_label", "desc"],
      isLoading: false
    };

    this.applyFilters = this.applyFilters.bind(this);
    this.applySortBy = this.applySortBy.bind(this);
    this.fetchDestinations = this.fetchDestinations.bind(this);
    this.onDismissFilter = this.onDismissFilter.bind(this);
    this.onMonthSelectChange = this.onMonthSelectChange.bind(this);
  }

  componentDidMount() {
    this.fetchDestinations();
  }

  fetchDestinations() {
    const sortByQS = {sort_by: this.state.sort_by[0] + '.' + this.state.sort_by[1]};
    const querystring = qs.stringify({...this.state.filters, ...sortByQS},
      {arrayFormat: 'repeat'});
    this.setState({isLoading: true});
    fetch('http://localhost:5000/destinations' + '?' + querystring).then((response) => {
      return response.json()
    }).then((response_json) => {
      this.setState({destinations: response_json.destinations, isLoading: false});
    })
  }

  applyFilters(filters, fetchDestinations = true) {
    const newFilters = _.omitBy({...this.state.filters, ...filters}, _.isNull);
    if (fetchDestinations) {
      this.setState({filters: newFilters}, this.fetchDestinations)
    }
    else {
      this.setState({filters: newFilters})
    }
  }

  onMonthSelectChange(month) {
    const newFilters = update(this.state.filters, {month: {$set: [`eq;${month}`]}});
    this.applyFilters(newFilters);
  }

  applySortBy(sort_by) {
    this.setState({sort_by: sort_by}, this.fetchDestinations)
  }

  onDismissFilter(filterKey) {
    this.setState({filters: _.omit(this.state.filters, filterKey)}, this.fetchDestinations)
  }

  render() {
    return (
        <Grid>
          <h1>Journey Generator</h1>
          <Row>
            <Col sm={6}>
              <LocationSelect
                locationFilters={_.pick(this.state.filters, ["city_id", "country_code", "continent"])}
                applyFilters={this.applyFilters}
              />
            </Col>
            <Col sm={2}>
              <FormGroup controlId="formControlsSelect">
                <ControlLabel>Month</ControlLabel>
                <FormControl componentClass="select"
                             placeholder="select"
                             value={this.state.filters.month[0].split(';')[1]}
                             onChange={(e) => this.onMonthSelectChange(e.target.value)}
                >
                  {months.map(month => (
                    <option
                      value={month.toLowerCase()}
                      key={month}
                    >
                      {month}
                    </option>

                  ))}
                </FormControl>
              </FormGroup>
            </Col>
          </Row>
          <div style={this.state.isLoading ? {opacity:0.5} : null}>
            {this.state.isLoading ? <h3 style={{position: "absolute",
          zIndex: 10,
          left: "50%",
          top: "40%"}}>
              Loading...
            </h3> : null}
            <DataTable
              applySortBy={this.applySortBy}
              destinations={this.state.destinations}
              applyFilters={this.applyFilters}
              sort_by={this.state.sort_by}
              filters={this.state.filters}
              onDismissFilter={this.onDismissFilter}
            />
          </div>
        </Grid>
    );
  }
};
