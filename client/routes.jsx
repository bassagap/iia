import React from 'react';
import {mount} from 'react-mounter';
import {MainLayout} from './layouts/MainLayout.jsx'
import App from '../imports/ui/App.jsx';
import Development from '../imports/ui/Dev_app.jsx';
FlowRouter.route('/', {
	action(){
		mount( MainLayout, {
			content: (<App />)
		})
	}
});
FlowRouter.route('/development', {
	action(){
		mount( MainLayout, {
			content: (<Development />)
		})
	}
});
