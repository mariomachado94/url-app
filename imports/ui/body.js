import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';

import { Urls } from '../api/urls.js';

//import './url.js'
import './body.html';

Template.body.onCreated(function bodyOnCreated() {
	this.state = new ReactiveDict();
	Meteor.subscribe('urls');
});

Template.body.events({
	'submit .new-url'(event) {
    	// Prevent default browser form submit
    	event.preventDefault();

    	const target = event.target;
    	const url = target.text.value;

    	target.text.value = '';

    	if(url === "") {
    		alert("Cannot enter an empty URL");
    	} else {
	    	Meteor.call('urls.insert', url, (err, res) => {
				alert(`Short URL: localhost:3000/${res}\nUse this generated URL to track stats!`);
	    	});
    	}
  	},
  	'click .list-group-item'(event, instance) {
  		if(event.target.id !== "") {
  			instance.state.set('selectedId', event.target.id);
  		}
  	},
});

Template.body.helpers({
	urls() {
		return Urls.find({}, { sort: { createdAt: -1 } });
	},
	getSelectedUrl() {
		const instance = Template.instance();
		return Urls.findOne(instance.state.get('selectedId'));
	},
});