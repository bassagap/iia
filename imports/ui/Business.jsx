import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { Businesses } from '../api/businesses.js';
import classnames from 'classnames';

// Business component - represents a single todo item
export default class Business extends Component {
  toggleChecked() {
    // Set the checked property to the opposite of its current value
    Meteor.call('businesses.setChecked', this.props.business._id, !this.props.business.checked);
  }

  deleteThisBusiness() {
    Meteor.call('businesses.remove', this.props.business._id);
  }

  render() {
    // Give businesses a different className when they are checked off,
    // so that we can style them nicely in CSS
  
    return (
      <li className={this.props.business.risk.concat(this.props.business.checked)}>
        <input
          type="checkbox"
          readOnly
          checked={this.props.business.checked}
          onClick={this.toggleChecked.bind(this)}
        />


        <span className="text">
          {this.props.business.text}
        </span>
      </li>
    );
  }
}

Business.propTypes = {
  // This component gets the business to display through a React prop.
  // We can use propTypes to indicate it is required
  business: PropTypes.object.isRequired
}