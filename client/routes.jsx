import React from 'react';
import {mount} from 'react-mounter';
import {MainLayout} from './layouts/MainLayout.jsx'
import App from '../imports/ui/App.jsx';
import Development from '../imports/ui/Dev_app.jsx';
import Business from '../imports/ui/BA_App.jsx';
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
FlowRouter.route('/business', {
	action(){
		mount( MainLayout, {
			content: (<Business />)
		})
	}
});
