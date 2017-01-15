import React, { Component, PropTypes } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { Meteor } from 'meteor/meteor';
import { Tasks } from '../api/tasks.js';
import classnames from 'classnames';

// Task component - represents a single todo item
export default class Task extends Component {
  toggleChecked() {
    // Set the checked property to the opposite of its current value
    Meteor.call('tasks.setChecked', this.props.task._id, !this.props.task.checked);
  }

  deleteThisTask() {
    Meteor.call('tasks.remove', this.props.task._id);
  }

  render() {
    // Give tasks a different className when they are checked off,
    // so that we can style them nicely in CSS
  
    return (
      <ReactCSSTransitionGroup
          component ="li"
          className={this.props.task.risk.concat(this.props.task.checked)}
           transitionName = "resolutionLoad"
           transitionEnterTimeOut = {600}
           transitionLeaveTimeOut = {400}>     
        <input
          type="checkbox"
          readOnly
          checked={this.props.task.checked}
          onClick={this.toggleChecked.bind(this)}
        />


        <span className="text">
          {this.props.task.text}
        </span>
      </ReactCSSTransitionGroup>
    );
  }
}

Task.propTypes = {
  // This component gets the task to display through a React prop.
  // We can use propTypes to indicate it is required
  task: PropTypes.object.isRequired
}