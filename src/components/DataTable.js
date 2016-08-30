import React, { Component } from 'react';
import { Table, Column, Cell} from 'fixed-data-table';
import { Checkbox, FormGroup, Button, FormControl, Label, Glyphicon } from 'react-bootstrap';
import _ from 'lodash';
import update from 'react-addons-update';
import ColumnChooserModal from './ColumnChooserModal';
import LocationSelect from './LocationSelect';
require('rc-slider/assets/index.css');
var Rcslider = require('rc-slider');
const qs = require('qs');


const getLocationOptions = () => {
  return fetch('http://127.0.0.1:5000/locations')
    .then((response) => {
      return response.json();
    }).then((json) => {
      return json["locations"];
    });
};

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

const SortableHeader = ({onSortChange, field, sortDir, children}) => (
  <a onClick={() => onSortChange(field)}>
    {children} {sortDir ? (sortDir === 'desc' ? '↓' : '↑') : ''}
  </a>
);

const FilterLabels = ({filters}) => {
  console.log('filter labels');
  console.log(filters);
  console.log(this.state.filters);
  const labels = _.keys(filters).map(field => {
    var op_values = filters[field];
    return op_values.map(op_value => {
        const [operator, values] = op_value.split(";");
        return (
          <span style={{padding: 3}}>
            <Label bsStyle="primary">{field} {operator} {values} <Glyphicon glyph="align-center"
                                                                            glyph="remove"/></Label>
      </span>
        )
      }
    )
  });
  return <h4>{labels}</h4>
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

class SortHeaderCell extends Component {
  render() {
    var {onSortChange, field, sortDir, children, ...props} = this.props;
    return (
      <Cell {...props}>
        <a onClick={() => onSortChange(field)}>
          {children} {sortDir ? (sortDir === 'desc' ? '↓' : '↑') : ''}
        </a>
      </Cell>
    )
  }
}

export default class ResultsContainer extends Component {

  constructor() {
    super();
    this.onSortChange = this.onSortChange.bind(this);
    this.fetchDestinations = this.fetchDestinations.bind(this);
    this.applyFilter = this.applyFilter.bind(this);
    this.applyFilters = this.applyFilters.bind(this);

    this.locationOptions = []

    this.state = {
      destinations: [],
      filters: {},
      showColumnChooserModal: false,
      locationValue: "",
      sort_by: ["safety_score", "desc"],
      tableData: [
        {
          header: "Name",
          label: "Name",
          width: 200,
          isVisible: true,
          fixed: true,
          cellContent: (props) => {
            return (
              <Cell {...props}>
                {this.state.destinations[props.rowIndex].city_name}, {this.state.destinations[props.rowIndex].country_name}
              </Cell>
            )
          }
        },
        {
          header: (props) => {
            return (
              <Cell {...props}>
                <SortableHeader
                  onSortChange={this.onSortChange}
                  sortDir={this.getSortDir("weather_index")}
                  field="weather_index"
                >
                  Weather Index
                </SortableHeader>
                <FilterSelectInput
                  field="weather_index"
                  placeholder="Min score"
                  applyFilter={this.applyFilter}
                  optionData={[
                  {value: 1, label:"1"},
                  {value: 2, label:"2"},
                  {value: 3, label:"3"},
                  {value: 4, label:"4"}
                  ]}
                />
              </Cell>
            )
          },
          label: "Weather Index",
          width: 100,
          isVisible: true,
          fixed: false,
          align: "center",
          cellContent: (props) => {
            return (
              <IndexCell
                data={this.state.destinations}
                field="weather_index"
                {...props}
              />
            )
          }
        },
        {
          header: () => {
            return (
              <SortHeaderCell
                onSortChange={this.onSortChange}
                sortDir={this.getSortDir("safety_score")}
                field="safety_score"
              >
                Safety Score
              </SortHeaderCell>
            )
          },
          label: "Safety Score",
          width: 100,
          isVisible: true,
          fixed: false,
          align: "center",
          cellContent: (props) => {
            return (
              <IndexCell
                data={this.state.destinations}
                field="safety_score"
                {...props}
              />
            )
          }
        },
        {
          header: (props) => {
            return (
              <Cell {...props}>
                <SortableHeader
                  onSortChange={this.onSortChange}
                  sortDir={this.getSortDir("attractions")}
                  field="attractions"
                >
                  Attractions
                </SortableHeader>
                <FilterSelectInput
                  field="attractions"
                  placeholder="Min score"
                  applyFilter={this.applyFilter}
                  optionData={[{value: 1, label:"1"}, {value: 2, label:"2"}]}
                />
              </Cell>
            )
          },
          label: "Attractions",
          width: 100,
          isVisible: true,
          fixed: false,
          align: "center",
          cellContent: (props) => {
            return (
              <Cell {...props}>
                {this.state.destinations[props.rowIndex].attractions}
              </Cell>
            )
          }
        },
        {
          header: () => {
            return (
              <SortHeaderCell
                onSortChange={this.onSortChange}
                sortDir={this.getSortDir("safety_score")}
                field="safety_score"
              >
                Safety Score
              </SortHeaderCell>
            )
          },
          label: "Safety Score",
          width: 100,
          isVisible: true,
          fixed: false,
          align: "center",
          cellContent: (props) => {
            return (
              <IndexCell
                data={this.state.destinations}
                field="safety_score"
                {...props}
              />
            )
          }
        }
      ]
    }
  }

  componentDidMount() {
    this.fetchDestinations()
    //this.locationOptions = getLocationOptions()
  }

  getSortDir(field) {
    return this.state.sort_by[0] == field ? this.state.sort_by[1] : null
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

  applyFilter(field, value) {
    const newFilter = {[field]: value};
    this.setState({filters: {...this.state.filters, ...newFilter}}, this.fetchDestinations);

  }

  applyFilters(filters) {
    const newFilters = _.omitBy({...this.state.filters, ...filters}, _.isNull)
    this.setState({filters: newFilters}, this.fetchDestinations)
  }

  onSortChange(field) {
    const new_sort_dir = this.state.sort_by[0] == field ? (this.state.sort_by[1] == 'asc' ? 'desc' : 'asc') : 'desc';
    this.setState({sort_by: [field, new_sort_dir]}, this.fetchDestinations);

  }

  onChangeColumnVisibility(checked, column) {
    const columnIndex = _.findIndex(this.state.tableData, ['header', column]);
    this.setState({tableData: update(this.state.tableData, {[columnIndex]: {isVisible: {$set: checked}}})});
  }

  applySliderFilter(field, gte, lte) {
    const newFilters = {[field]: [`gte;${gte}`, `lte;${lte}`]};
    this.setState({filters: {...this.state.filters, ...newFilters}}, this.fetchDestinations);
  }

  render() {
    return (
      <div>
        <div>
          <div style={{width:"40%"}}>
            <LocationSelect
              locationFilters={_.pick(this.state.filters, ["city_id", "country", "continent"])}
              applyFilters={this.applyFilters}
            />
          </div>
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
        <span style={{float: "right"}}><a onClick={() => this.setState({showColumnChooserModal: true})}>Choose
          columns</a></span>
        <ColumnChooserModal
          show={this.state.showColumnChooserModal}
          onHide={() => this.setState({showColumnChooserModal: false})}
        >
          <FormGroup>
            {this.state.tableData.map((columnData, index) => {
              return (
                <Checkbox
                  checked={columnData.isVisible}
                  onChange={(e) => this.onChangeColumnVisibility(e.target.checked, columnData.header)}
                  key={index}
                >
                  {columnData.label}
                </Checkbox>
              )
            })
            }
          </FormGroup>
        </ColumnChooserModal>
        {!_.isEmpty(_.omit(this.state.filters, ["city_id", "continent", "country"])) ?
          <FilterLabels
            filters={_.omit(this.state.filters, ["city_id", "continent", "country"])}
          />
          : null}
        <div>
          <Table
            rowsCount={this.state.destinations.length}
            rowHeight={50}
            headerHeight={80}
            width={1100}
            height={700}>
            {this.state.tableData.map((columnData, index) => {
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
