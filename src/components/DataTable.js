import React, { Component } from 'react';
import { Table, Column, Cell} from 'fixed-data-table';
import { Checkbox, FormGroup, Button, Row, Col, Tooltip, OverlayTrigger } from 'react-bootstrap';
import update from 'react-addons-update';
import _ from 'lodash';
import ColumnChooserModal from './ColumnChooserModal';
import FilterLabels from './FilterLabels';
import Dimensions from 'react-dimensions'
import Ratings from './Ratings';
import tableData from './TableData'
require('rc-slider/assets/index.css');
var Rcslider = require('rc-slider');

class IndexCell extends Component {
  render() {
    const {rowIndex, field, data, ...props} = this.props;
    const value = Math.round(data[rowIndex][field] * 100).toString() + "%";
    return (
      <Cell {...props}>
        <span className="index_value">
          {value}
        </span>
      </Cell>
    )
  }
}

class SortHeaderCell extends Component {
  render() {
    var {onSortChange, field, tooltipMsg, sortDir, children, ...props} = this.props;
    let [label, filter] = React.Children.toArray(children);
    const tooltip = (
      <Tooltip id={field}>{tooltipMsg}</Tooltip>
    );
    return (
      <Cell {...props}>
        {tooltipMsg ?
          <OverlayTrigger placement="top" overlay={tooltip}>
            <a style={{cursor:"pointer"}} onClick={() => onSortChange(field)}>
              {label} {sortDir ? (sortDir === 'desc' ? '↓' : '↑') : ''}
            </a>
          </OverlayTrigger>
          :
          <a style={{cursor:"pointer"}} onClick={() => onSortChange(field)}>
            {label} {sortDir ? (sortDir === 'desc' ? '↓' : '↑') : ''}
          </a>}
        {filter}
      </Cell>
    )
  }
}

class RatingCell extends Component {
  render() {
    var {rowIndex, iconName, selectedColor, field, data, ...props} = this.props;
    return (
      <Cell {...props}>
        <Ratings
          field={field}
          iconName={iconName}
          interactive={false}
          staticRating={data[rowIndex][field]}
          selectedColor={selectedColor}
        />
      </Cell>
    )
  }
}

export default class DataTable extends Component {

  constructor(props) {
    super(props);

    this.onSortChange = this.onSortChange.bind(this);
    this.generateTableColumns = this.generateTableColumns.bind(this);

    this.state = {
      showColumnChooserModal: false,
      tableColumns: this.generateTableColumns(tableData)
    }
  }

  getSortDir(field) {
    const { sort_by } = this.props;
    return sort_by[0] == field ? sort_by[1] : null
  }

  onChangeColumnVisibility(checked, label) {
    console.log(label);
    const columnIndex = _.findIndex(this.state.tableColumns, ['label', label]);
    console.log(columnIndex);
    this.setState({tableColumns: update(this.state.tableColumns, {[columnIndex]: {isVisible: {$set: checked}}})});
  }

  applySliderFilter(field, gte, lte, fetchDestinations = true) {
    console.log(`applying slider filter: ${field}`);
    const newFilters = {[field]: [`gte;${gte}`, `lte;${lte}`]};
    //this.setState({filters: {...this.state.filters, ...newFilters}}, this.fetchDestinations);
    this.props.applyFilters(newFilters, fetchDestinations)
  }

  getSliderValues(field) {
    if (this.props.filters[field]) {
      const filters = this.props.filters[field];
      var results = {};
      filters.forEach(filter => {
        const [operator, value] = filter.split(";");
        results[operator] = parseFloat(value);
      });
      return [results["gte"], results["lte"]]
    }
    return null;
  }

  generateTableColumns(tableData) {
    return tableData.map(column => {
      let {label, field, iconName, tooltipMsg, selectedColor, fixed, align,height, width, isVisible, sliderMin, sliderMax, sliderStep, contentType, filterType} = column;
      width = width || 125;
      height = height || 60;
      return {
        header: label == 'Name' ? '' : () => {
          switch (filterType) {
            case "rating":
              return (
                <SortHeaderCell
                  onSortChange={this.onSortChange}
                  sortDir={this.getSortDir(field)}
                  field={field}
                  width={width}
                  height={height}
                  tooltipMsg={tooltipMsg}
                >
                  {label}
                  <Ratings
                    field={field}
                    iconName={iconName}
                    interactive={true}
                    selectedRating={this.props.filters[field] ? parseInt(this.props.filters[field][0].split(";")[1]): null}
                    applyFilters={this.props.applyFilters}
                    selectedColor={selectedColor}
                  />
                </SortHeaderCell>
              );
            case "slider":
              return (
                <SortHeaderCell
                  onSortChange={this.onSortChange}
                  sortDir={this.getSortDir(field)}
                  field={field}
                  width={width}
                  height={height}
                  tooltipMsg={tooltipMsg}
                >
                  {label}
                  <div style={{padding: 8}}>
                    <Rcslider
                      min={sliderMin}
                      max={sliderMax}
                      step={sliderStep}
                      value={this.getSliderValues(field) || [sliderMin,sliderMax]}
                      range={true}
                      onChange={([gte, lte]) => this.applySliderFilter(field, gte, lte, false)}
                      //defaultValue={[0,1]}
                      //marks={{1:1, 2:"2", 3: "3", 4: "4", 5:"5", 4.5: ""}}
                      onAfterChange={([gte, lte]) => this.applySliderFilter(field, gte, lte)}
                    />
                  </div>
                </SortHeaderCell>
              )
          }
        },
        label: label,
        width: width,
        isVisible: isVisible,
        fixed: fixed,
        align: align,
        cellContent: (props) => {
          switch (contentType) {
            case "location":
              return (
                <Cell {...props}>
                  <b>{this.props.destinations[props.rowIndex].city_name}</b>
                  <p style={{fontSize: 11, color: "#989898"}}>{this.props.destinations[props.rowIndex].country_name}</p>
                </Cell>
              );
            case "index":
              return (
                <IndexCell
                  data={this.props.destinations}
                  field={field}
                  {...props}
                />
              );
            case "raw":
              return (
                <Cell {...props}>
                  {this.props.destinations[props.rowIndex][field]}
                </Cell>
              );
            case "dollar":
              return (
                <Cell {...props}>
                  ${parseInt(this.props.destinations[props.rowIndex][field])}
                </Cell>
              );
            case "integer":
              return (
                <Cell {...props}>
                  {parseInt(this.props.destinations[props.rowIndex][field])}
                </Cell>
              );
            case "rating":
              return (
                <RatingCell
                  data={this.props.destinations}
                  field={field}
                  iconName={iconName}
                  selectedColor={selectedColor}
                  {...props}
                />
              );
          }
        }
      }
    })
  }

  onSortChange(field) {
    const { sort_by, applySortBy } = this.props;
    const new_sort_dir = sort_by[0] == field ? (sort_by[1] == 'asc' ? 'desc' : 'asc') : 'desc';
    applySortBy([field, new_sort_dir])
  }

  render() {
    const { filters, onDismissFilter, destinations } = this.props;
    return (
      <div>
        <Row>
          <Col md={10}>
            {!_.isEmpty(_.omit(filters, ["month", "city_id", "continent", "country_code"])) ?
              <FilterLabels
                filters={_.omit(filters, ["month", "city_id", "continent", "country_code"])}
                onDismissFilter={onDismissFilter}
              />
              : null}
          </Col>
          <Col md={2}>
        <span style={{float: "right"}}>
          <a onClick={() => this.setState({showColumnChooserModal: true})}>
            Choose columns
          </a>
        </span>
            <ColumnChooserModal
              show={this.state.showColumnChooserModal}
              onHide={() => this.setState({showColumnChooserModal: false})}
            >
              <FormGroup>
                {this.state.tableColumns.map((columnData, index) => {
                  let { isVisible, label } = columnData;
                  return (
                    <Checkbox
                      checked={isVisible}
                      onChange={(e) => this.onChangeColumnVisibility(e.target.checked, label)}
                      key={index}
                    >
                      {label}
                    </Checkbox>
                  )
                })
                }
              </FormGroup>
            </ColumnChooserModal>
          </Col>
        </Row>
        <div style={{width: "100%"}}>
          <Table
            rowsCount={destinations.length}
            rowHeight={60}
            headerHeight={60}
            width={1140}
            height={600}>
            {this.state.tableColumns.map((columnData, index) => {
              if (columnData.isVisible) {
                return (
                  <Column
                    header={columnData.header}
                    fixed={columnData.fixed}
                    align={columnData.align}
                    cell={props => (
                    columnData.cellContent(props)
                  )}
                    width={columnData.width}
                    key={index}
                  />
                )
              }
            })
            }
          </Table>
        </div>
      </div>
    )
  }

}
