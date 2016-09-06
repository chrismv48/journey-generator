import React, { Component } from 'React';
import { Glyphicon, Label } from 'react-bootstrap';
import _ from 'lodash';
import tableData from './TableData';

const operatorMapping = {
  gte: "≥",
  lte: "≤",
  ge: ">",
  le: "<",
  eq: "="
};

const FilterLabels = ({filters, onDismissFilter}) => {
  const labels = _.keys(filters).map(field => {
    var op_values = filters[field];
    const label = _.find(tableData, ['field', field]).label;
    return op_values.map(op_value => {
        var [operator, values] = op_value.split(";");
        operator = _.get(operatorMapping, operator, operator);
        return (
          <span style={{padding: 3}}>
            <Label bsStyle="primary">{label} {operator} {values}
              <i
                onClick={() => onDismissFilter(field)}
                className="fa fa-remove"
                style={{cursor:"pointer", paddingLeft: 4}}
              />
            </Label>
          </span>
        )
      }
    )
  });
  return <h5>{labels}</h5>
};

export default FilterLabels
