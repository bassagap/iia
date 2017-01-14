import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import CopyToClipboard from 'react-copy-to-clipboard';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { Tasks } from '../api/tasks.js';
import { Developments } from '../api/developments.js';

import Task from './Task.jsx';
import Development from './Development.jsx';

// App component - represents the whole app
class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hideCompleted: false,
      value: 'bassagap',
      testerID : 'bassagap',
      developmentID : 'sioranm2',
      copied : false,
    };
    
  }
  handleChangeTester(event) {
    this.setState({value: event.target.value}); 
    this.setState({testerID: event.target.value})
  }

  handleChangeDevelopment(event) {

    this.setState({value: event.target.value});
    this.setState({developmentID: event.target.value});
  }

  handleChange(event) {
    this.setState({value: event.target.value,
                   copied: false,
                   textToCopy: event.target.value});
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


  onCopy() {
    this.setState({copied: true});
  }

  renderTasks() {
    let filteredTasks = this.props.tasks;

    return filteredTasks.map((task) => {
      return (
        <Task
          key={task._id}
          task={task}
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
      "Rationale for product risk ( " + this.state.testerID + ") : " +  task.text  + "\n"    
      );

    });
    }
    return "void";
  }
  renderCopyDevelopment(){
    let filteredDevelopments = this.props.developments;
    if (this.state.hideCompleted) {
     filteredDevelopments = filteredDevelopments.filter(development => development.checked);
      return filteredDevelopments.map((development) => {  
      return (
       "Rationale for development risk (" + this.state.developmentID + ") : " + development.text + "\n"      
      );
    });
    }
    return "void";
  }

  render() {
    return (
 <div className="container">
        <header>
          <h1>INTERNAL ISUES ASSESSMENT </h1>
        </header>
        <header>
          <h1> Testing </h1>
          <nav>
            <a href = "/">Testing </a>
            <a href = "/development">Development </a>
            <label className="hide-completed">
            <input
              type="checkbox"
              readOnly
              checked={this.state.hideCompleted}
              onClick={this.toggleHideCompleted.bind(this)}
            />
            Generate
          </label>
          </nav>  
        </header>
          <ul>
           <label>
            Tester ID:
              <select value={this.state.value} onChange={this.handleChangeTester.bind(this)}>
                <option value="bassagap">bassagap</option>
                <option value="lopezpef">lopezpef</option>
                <option value="mateocad">mateocad</option>
                <option value="gutierp6">gutierp6</option>
              </select>
          </label>          
            {this.renderTasks()}
          </ul>
        <ul>
          <h2> Message to be copied:  </h2> <br/>
         {this.renderCopyTesting()} <br/>
         {this.renderCopyDevelopment()} <br/>  

        <CopyToClipboard text={this.renderCopyTesting().concat(this.renderCopyDevelopment())}  onCopy={this.onCopy.bind(this)}>
        <button>Copy to clipboard</button>
        </CopyToClipboard>&nbsp; 

        {this.state.copied ? <span style={{color: 'red'}}>Copied.</span> : null}   
        
            <form className="new-task" onSubmit={this.handleSubmitTesting.bind(this)} >
              <input
                type="text"
                ref="textInput"
                placeholder="Type to add new product risk"
              />
            </form> 
            </ul>
            <ul>
            <form className="new-task" onSubmit={this.handleSubmitDevelopment.bind(this)} >
              <input
                type="text"
                ref="textInput1"
                placeholder="Type to add new development risk"
              />
            </form>  
          </ul>
      </div>
    );
  }
}

App.propTypes = {
  tasks: PropTypes.array.isRequired,
  developments : PropTypes.array.isRequired,
  textToCopy : PropTypes.string,
};

export default createContainer(() => {
  Meteor.subscribe('developments');
  Meteor.subscribe('tasks');
  Meteor.subscribe('usersid');
  return {
    developments: Developments.find({}, { sort: { risk: -1 } }).fetch(),
    tasks: Tasks.find({}, { sort: { risk: -1 } }).fetch()
  };

}, App)



