import React, { Component } from 'react';
import { Table, Column, Cell} from 'fixed-data-table';
import { Checkbox, FormGroup, Button } from 'react-bootstrap';
import update from 'react-addons-update';
import _ from 'lodash';
import ColumnChooserModal from './ColumnChooserModal';
import Dimensions from 'react-dimensions'

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


export default class DataTable extends Component {

  constructor(props) {
    super(props);

    this.onSortChange = this.onSortChange.bind(this);

    this.state = {
      showColumnChooserModal: false,
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
                {this.props.destinations[props.rowIndex].city_name}, {this.props.destinations[props.rowIndex].country_name}
              </Cell>
            )
          }
        },
        {
          header: () => {
            return (
              <SortHeaderCell
                onSortChange={this.onSortChange}
                sortDir={this.getSortDir("weather_index")}
                field="weather_index"
              >
                Weather Index
              </SortHeaderCell>
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
                data={this.props.destinations}
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
                data={this.props.destinations}
                field="safety_score"
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
                sortDir={this.getSortDir("attractions")}
                field="attractions"
              >
                Attractions
              </SortHeaderCell>
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
                {this.props.destinations[props.rowIndex].attractions}
              </Cell>
            )
          }
        }
      ]
    }
  }

  getSortDir(field) {
    const { sort_by } = this.props;
    return sort_by[0] == field ? sort_by[1] : null
  }

  onChangeColumnVisibility(checked, column) {
    const columnIndex = _.findIndex(this.state.tableData, ['header', column]);
    this.setState({tableData: update(this.state.tableData, {[columnIndex]: {isVisible: {$set: checked}}})});
  }

  onSortChange(field) {
    const { sort_by, applySortBy } = this.props;
    const new_sort_dir = sort_by[0] == field ? (sort_by[1] == 'asc' ? 'desc' : 'asc') : 'desc';
    applySortBy([field, new_sort_dir])
  }

  render() {
    return (
      <div>
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

        <div style={{width: "100%"}}>
          <Table
            rowsCount={this.props.destinations.length}
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
