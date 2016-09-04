import React, { Component } from 'react';
//import Radium from 'radium';
var Radium = require('radium');

const buildStyles = (interactive, selectedColor, unselectedColor) => {
  if (interactive) {
    return {
      unselected: {
        color: unselectedColor,
        padding: 1,
        cursor: "pointer",
        ':hover': {
          color: selectedColor
        }
      },
      selected: {
        color: selectedColor,
        padding: 1,
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
        color: unselectedColor,
        padding: 1
      },
      selected: {
        color: selectedColor,
        padding: 1
      }
    }
  }
};

@Radium
export default class Ratings extends Component {
  static defaultProps = {
    iconName: "fa fa-star fa-lg",
    interactive: true,
    selectedColor: "#E9BD0C",
    unselectedColor: "#CACACA",
    applyFilters: _.noop,
    staticRating: null,
    selectedRating: null
  };
  static propTypes = {
    field: React.PropTypes.string.isRequired,
    iconName: React.PropTypes.string,
    interactive: React.PropTypes.bool,
    selectedColor: React.PropTypes.string,
    unselectedColor: React.PropTypes.string,
    applyFilters: React.PropTypes.func,
    staticRating: React.PropTypes.number,
    selectedRating: React.PropTypes.number
  };

  constructor(props, propTypes, defaultProps) {
    super(props, propTypes, defaultProps);
    this.state = {
      //selectedRating: 0,
      hoverValue: null
    };

    const {interactive, selectedColor, unselectedColor} = props;

    this.styles = buildStyles(interactive, selectedColor, unselectedColor)

  }


  handleOnClick(selectedRating) {
    if (selectedRating == this.props.selectedRating) {
      this.setState({selectedRating: 0, hoverValue: 0})
    }
    else {
      this.setState({selectedRating})
    }
    this.props.applyFilters({[this.props.field]: [`gte;${selectedRating}`]})
  }

  getStyle(value) {
    if (value <= this.props.selectedRating || value <= this.state.hoverValue || value <= this.props.staticRating) {
      return this.styles.selected
    }
    else {
      return this.styles.unselected
    }
  }

  render() {
    const { interactive, iconName } = this.props;
    return (
      <div>
          {[1, 2, 3, 4, 5].map(value => (
              interactive ?
                <i
                  className={iconName}
                  onMouseEnter={() => this.setState({hoverValue: value})}
                  onMouseLeave={() => this.setState({hoverValue: 0})}
                  key={value}
                  //ref="rating"
                  onClick={() => this.handleOnClick(value)}
                  style={this.getStyle(value)}
                />
                :
                <i
                  className={iconName}
                  key={value}
                  style={this.getStyle(value)}
                />
            )
          )}
      </div>
    )
  }
}
