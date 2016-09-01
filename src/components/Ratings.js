import React, { Component } from 'react';
import { Glyphicon } from 'react-bootstrap';
//import Radium from 'radium';
var Radium = require('radium');
const GlyphiconStyled = Radium(Glyphicon);

const buildStyles = (interactive, selectedColor, unselectedColor) => {
  if (interactive) {
    return {
      unselected: {
        color: unselectedColor,
        cursor: "pointer",
        ':hover': {
          color: selectedColor
        }
      },
      selected: {
        color: selectedColor,
        cursor: "pointer",
        ':hover': {
          color: selectedColor
        }
      }
    }
  }
  else {
    return {
      unselected: {
        color: unselectedColor
      },
      selected: {
        color: selectedColor
      }
    }
  }
};

@Radium
export default class Ratings extends Component {
  static defaultProps = {
    glyph: "star",
    interactive: true,
    selectedColor: "#e9cd10",
    unselectedColor: "#aaa",
    applyFilters: _.noop,
    defaultRating: 0
  };
  static propTypes = {
    field: React.PropTypes.string.isRequired,
    glyph: React.PropTypes.string,
    interactive: React.PropTypes.bool,
    selectedColor: React.PropTypes.string,
    unselectedColor: React.PropTypes.string,
    applyFilters: React.PropTypes.func,
    defaultRating: React.PropTypes.number
  };

  constructor(props, propTypes, defaultProps) {
    super(props, propTypes, defaultProps);

    this.state = {
      selectedRating: this.props.defaultRating || 0,
      hoverValue: null
    };

    const {interactive, selectedColor, unselectedColor} = this.props;

    this.styles = buildStyles(interactive, selectedColor, unselectedColor)

  }


  handleOnClick(selectedRating) {
    if (selectedRating == this.state.selectedRating) {
      this.setState({selectedRating: 0, hoverValue: 0})
    }
    else {
      this.setState({selectedRating})
    }
    this.props.applyFilters({[this.props.field]: [`gte;${selectedRating}`]})
  }

  getStyle(value) {
    if (value <= this.state.selectedRating || value <= this.state.hoverValue) {
      return this.styles.selected
    }
    else {
      return this.styles.unselected
    }
  }

  render() {
    const { interactive, glyph } = this.props;
    return (
      <div>
        <h3>
          {[1, 2, 3, 4, 5].map(value => (
              interactive ?
                <GlyphiconStyled
                  onMouseEnter={() => this.setState({hoverValue: value})}
                  onMouseLeave={() => this.setState({hoverValue: 0})}
                  key={value}
                  ref="rating"
                  glyph={glyph}
                  onClick={() => this.handleOnClick(value)}
                  style={this.getStyle(value)}
                />
                :
                <GlyphiconStyled
                  key={value}
                  glyph={glyph}
                  style={this.getStyle(value)}
                />
            )
          )}
        </h3>
      </div>
    )
  }
}
