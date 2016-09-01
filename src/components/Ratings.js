import React, { Component } from 'react';
import { Glyphicon } from 'react-bootstrap';
//import Radium from 'radium';
var Radium = require('radium');
const GlyphiconStyled = Radium(Glyphicon);

const styles = {
  base: {
    color: "#aaa",
    cursor: "pointer",
    ':hover': {
      color: "green"
    }
  },
  selected: {
    color: "green",
    cursor: "pointer",
    ':hover': {
      color: "green"
    }
  }
};

@Radium
export default class Ratings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedRating: 0,
      hoverValue: null
    }
  }

  handleOnChange(selectedRating) {
    if (selectedRating == this.state.selectedRating) {
      this.setState({selectedRating: 0, hoverValue: 0})
    }
    else {
      this.setState({selectedRating})
    }
  }

  getStyle(value) {
    if (value <= this.state.selectedRating || value <= this.state.hoverValue) {
      return styles.selected
    }
    else {
      return styles.base
    }
  }

  render() {
    const { field } = this.props || 'foo';
    return (
      <div>
        <h3>
          {[1, 2, 3, 4, 5].map(value => (
              <GlyphiconStyled
                onMouseEnter={() => this.setState({hoverValue: value})}
                onMouseLeave={() => this.setState({hoverValue: 0})}
                key={value}
                ref="rating"
                glyph="usd"
                onClick={() => this.handleOnChange(value)}
                style={this.getStyle(value)}
              />
            )
          )}
        </h3>
      </div>
    )
  }
}
