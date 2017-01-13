import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { Tasks } from '../api/tasks.js';
import Task from './Task.jsx';
import { Developments } from '../api/developments.js';

import Development from './Development.jsx';
import AccountsUIWrapper from './AccountsUIWrapper.jsx';

// App component - represents the whole app
class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hideCompleted: false,
    };
  }

  handleSubmitTesting(event) {
    event.preventDefault();

    // Find the text field via the React ref
    const text = ReactDOM.findDOMNode(this.refs.textInput).value.trim();

    Meteor.call('tasks.insert', text);

    // Clear form
    ReactDOM.findDOMNode(this.refs.textInput).value = '';
  }
  handleSubmitDevelopment(event) {
    event.preventDefault();

    // Find the text field via the React ref
    const text = ReactDOM.findDOMNode(this.refs.textInput1).value.trim();

    Meteor.call('developments.insert', text);

    // Clear form
    ReactDOM.findDOMNode(this.refs.textInput1).value = '';
  }

  toggleHideCompleted() {
    this.setState({
      hideCompleted: !this.state.hideCompleted,
    });
  }

  renderTasks() {
    let filteredTasks = this.props.tasks;
    return filteredTasks.map((task) => {
      const currentUserId = this.props.currentUser && this.props.currentUser._id;
      return (
        <Task
          key={task._id}
          task={task}
        />
      );
    });
  }
  renderDevelopments() {
    let filteredDevelopments = this.props.developments;

    return filteredDevelopments.map((development) => {
      const currentUserId = this.props.currentUser && this.props.currentUser._id;  
      return (
        <Development
          key={development._id}
          development={development}
          
        />
      );
    });
  }

  renderCopyTesting(){
    let filteredTasks = this.props.tasks;
    if (this.state.hideCompleted) {
     filteredTasks = filteredTasks.filter(task => task.checked);
      return filteredTasks.map((task) => {  
      return (
        <Task
          task={task}
        />
      );
    });
    }
    return null;
  }
    renderCopyDevelopment(){
    let filteredDevelopments = this.props.developments;
    if (this.state.hideCompleted) {
     filteredDevelopments = filteredDevelopments.filter(development => development.checked);
      return filteredDevelopments.map((development) => {  
      return (
        <Development
          development={development}
        />
      );
    });
    }
    return null;
  }

  render() {
    return (
      <div className="container">
        <header>
          <h1>INTERNAL ISUES ASSESSMENT </h1>
          </header>
          <header>
          <h1> Testing </h1>
          <label className="hide-completed">
            <input
              type="checkbox"
              readOnly
              checked={this.state.hideCompleted}
              onClick={this.toggleHideCompleted.bind(this)}
            />
            Generate
          </label>

          <AccountsUIWrapper />
        </header>
        <table>
        <tr>
        <td>
          <ul>
            {this.renderTasks()}
          </ul>
        </td>

        <td>
          <ul>
           {this.renderDevelopments()}
          </ul>
        </td>
        </tr>
        </table>
        <ul>
        
        <h2> Message to be copied:  </h2> <br/>
        
        Rationale for product risk ({this.props.currentUser ? <span> {this.props.currentUser.username}</span> : ''}) : 
          {this.renderCopyTesting()}
        Rationale for business risk ({this.props.currentUser ? <span> {this.props.currentUser.username}</span> : ''}) : 
          {this.renderCopyDevelopment()}
           { this.props.currentUser ?
            <form className="new-task" onSubmit={this.handleSubmitTesting.bind(this)} >
              <input
                type="text"
                ref="textInput"
                placeholder="Type to add new product risk"
              />
            </form> : ''}
            </ul>
            <ul>
            { this.props.currentUser ?
            <form className="new-task" onSubmit={this.handleSubmitDevelopment.bind(this)} >
              <input
                type="text"
                ref="textInput1"
                placeholder="Type to add new development risk"
              />
            </form> : ''
          }
             
        </ul>
      </div>
    );
  }
}

App.propTypes = {
  tasks: PropTypes.array.isRequired,
  developments : PropTypes.array.isRequired,
  incompleteCount: PropTypes.object,
  currentUser: PropTypes.object,
  textToCopy : PropTypes.string,
};

export default createContainer(() => {
  Meteor.subscribe('developments');
   Meteor.subscribe('tasks');
  return {
    developments: Developments.find({}, { sort: { createdAt: -1 } }).fetch(),
    tasks: Tasks.find({}, { sort: { createdAt: -1 } }).fetch(),
    incompleteCount: Tasks.find({ checked: { $ne: true } }),
    currentUser: Meteor.user(),
  };

}, App);