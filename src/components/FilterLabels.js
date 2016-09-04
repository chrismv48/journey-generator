import React, { Component } from 'React';
import { Glyphicon, Label } from 'react-bootstrap';

const FilterLabels = ({filters, onDismissFilter}) => {
  const labels = _.keys(filters).map(field => {
    var op_values = filters[field];
    return op_values.map(op_value => {
        const [operator, values] = op_value.split(";");
        return (
          <span style={{padding: 3}}>
            <Label bsStyle="primary">{field} {operator} {values}
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
