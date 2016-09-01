import React, { Component } from 'React';
import { Glyphicon, Label } from 'react-bootstrap';

const FilterLabels = ({filters}) => {
  console.log('filter labels');
  console.log(filters);
  const labels = _.keys(filters).map(field => {
    var op_values = filters[field];
    return op_values.map(op_value => {
        const [operator, values] = op_value.split(";");
        return (
          <span style={{padding: 3}}>
            <Label bsStyle="primary">{field} {operator} {values}
              <Glyphicon glyph="remove"/>
            </Label>
          </span>
        )
      }
    )
  });
  return <h4>{labels}</h4>
};

export default FilterLabels
