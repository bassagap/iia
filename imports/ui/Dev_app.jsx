import React, { Component, PropTypes } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import ReactDOM from 'react-dom';
import CopyToClipboard from 'react-copy-to-clipboard';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { Tasks } from '../api/tasks.js';
import { Developments } from '../api/developments.js';
import { Businesses } from '../api/businesses.js';
import Task from './Task.jsx';
import Development from './Development.jsx';
import Business from './Business.jsx';
// App component - represents the whole app
class Dev_App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hideCompleted: false,
      value: 'bassagap',
      testerID : 'bassagap',
      developmentID : 'sioranm2',
      copied : false
    };
    
  }
  handleChangeTester(event) {
    this.setState({value: event.target.value}); 
    this.setState({testerID: event.target.value})
  }

  handleChangeDevelopment(event) {
    this.setState({value: event.target.value});
    this.setState({developmentID: event.target.value})
  }
  onCopy() {
    this.setState({copied: true});
  }

  toggleHideCompleted() {
    this.setState({
      hideCompleted: !this.state.hideCompleted,
    });
  }
   
  renderDevelopments() {
    let filteredDevelopments = this.props.developments;

    return filteredDevelopments.map((development) => {
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

    renderCopyBusiness(){
    let filteredBusinesses = this.props.businesses;
    if (this.state.hideCompleted) {
     filteredBusinesses = filteredBusinesses.filter(business => business.checked);
     return filteredBusinesses.map((business) => {  
      return (
       "Rationale for business risk (" + this.state.businessID + ") : " + business.text + "\n"      
      );
    });
    }
    return "void";
  }
  render() {
    return (
    <ReactCSSTransitionGroup
          component ="div"
          className ="container"
           transitionName = "route"
           transitionEnterTimeOut = {600}
           transitionAppearTimeOut = {600}
           transitionLeaveTimeOut = {400}
           transitionAppear ={true}>
              
          <h1> Development </h1>
           
            <label className="hide-completed">
              <input
                type="checkbox"
                readOnly
                checked={this.state.hideCompleted}
                onClick={this.toggleHideCompleted.bind(this)}
              />
            Generate

            <CopyToClipboard text={this.renderCopyTesting().concat(this.renderCopyDevelopment()).concat(this.renderCopyBusiness())}  onCopy={this.onCopy.bind(this)}>
            <button>Copy to clipboard</button>
            </CopyToClipboard>&nbsp; 
            </label>                    
          <ul>
          <label>
            Development ID:
              <select value={this.state.value} onChange={this.handleChangeDevelopment.bind(this)}>
                <option value="sorianm2">sorianm2</option>
                <option value="nunezm">nunezm</option>
                <option value="sendrose">sendrose</option>
              </select>
          </label> 
           <ReactCSSTransitionGroup
           transitionName = "resolutionLoad"
           transitionEnterTimeOut = {600}
           transitionLeaveTimeOut = {400}>

            {this.renderDevelopments()}
           </ReactCSSTransitionGroup>
          </ul>
          <ul>
          <h2> Message to be copied:  </h2> <br/>
            {this.renderCopyTesting()} <br/>
            {this.renderCopyDevelopment()} <br/>  
            {this.renderCopyBusiness()} <br/>  
            {this.state.copied ? <span style={{color: 'red'}}>Copied.</span> : null}    
          </ul>
    </ReactCSSTransitionGroup>
    );
  }
}

Dev_App.propTypes = {
  tasks: PropTypes.array.isRequired,
  developments : PropTypes.array.isRequired
};

export default createContainer(() => {
  Meteor.subscribe('developments');
  Meteor.subscribe('tasks');
  return {
    developments: Developments.find({}, { sort: { risk: -1 } }).fetch(),
    tasks: Tasks.find({}, { sort: { risk: -2} }).fetch()
  };

}, Dev_App)
