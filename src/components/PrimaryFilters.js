import React, { Component } from 'react';
import Select from 'react-select';
import Ratings from './Ratings';
import LocationSelect from './LocationSelect';
import { Grid, Row, Col } from 'react-bootstrap'
import _ from 'lodash';
require('rc-slider/assets/index.css');
var Rcslider = require('rc-slider');


//const FilterSelectInput = ({field, applyFilter, placeholder, optionData}) => (
//  <FormControl onChange={(e) => applyFilter(field, e.target.value)} componentClass="select" placeholder={placeholder}>
//    <option value="" disabled selected>{placeholder}</option>
//    {optionData.map((option, i) => (
//        <option key={i} value={option.value}>{option.label}</option>
//      )
//    )}
//  </FormControl>
//);

export default class PrimaryFilters extends Component {
  constructor(props) {
    super(props);
  }

  applySliderFilter(field, gte, lte, fetchDestinations=true) {
    const newFilters = {[field]: [`gte;${gte}`, `lte;${lte}`]};
    //this.setState({filters: {...this.state.filters, ...newFilters}}, this.fetchDestinations);
    this.props.applyFilters(newFilters, fetchDestinations)
  }

  render() {
    return (
      <div>
        <div style={{width:"40%"}}>
          <LocationSelect
            locationFilters={_.pick(this.props.filters, ["city_id", "country_code", "continent"])}
            applyFilters={this.props.applyFilters}
          />
        </div>
        <Grid>
          <Row>
            <Col sm={1}>
              <h4 style={{align:"right"}}>Attractions</h4>
            </Col>
            <Col sm={2}>
              <Ratings
                applyFilters={this.props.applyFilters}
                field="attractions"
              />
            </Col>
          </Row>
        </Grid>
        <div style={{width:"10%", padding: 15}}>
          <Rcslider
            min={1}
            max={5}
            step={0.5}
            range={true}
            defaultValue={[1,5]}
            marks={{1:1, 2:"2", 3: "3", 4: "4", 5:"5", 4.5: ""}}
            onAfterChange={([gte, lte]) => this.applySliderFilter("attractions", gte, lte)}
          />
        </div>
      </div>
    )
  }
}
