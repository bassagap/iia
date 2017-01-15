import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { Developments } from '../api/developments.js';
import classnames from 'classnames';

// Development component - represents a single todo item
export default class Development extends Component {
  toggleChecked() {
    // Set the checked property to the opposite of its current value
    Meteor.call('developments.setChecked', this.props.development._id, !this.props.development.checked);
  }

  deleteThisDevelopment() {
    Meteor.call('developments.remove', this.props.development._id);
  }

  render() {
    // Give developments a different className when they are checked off,
    // so that we can style them nicely in CSS

    return (
      <li className= {this.props.development.risk.concat(this.props.development.checked)}>
        <input
          type="checkbox"
          readOnly
          checked={this.props.development.checked}
          onClick={this.toggleChecked.bind(this)}
        />
        
        <span className="text">
          {this.props.development.text}
        </span>
      </li>
    );
  }
}

Development.propTypes = {
  // This component gets the development to display through a React prop.
  // We can use propTypes to indicate it is required
  development: PropTypes.object.isRequired,
};