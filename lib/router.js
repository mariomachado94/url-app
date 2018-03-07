import { Meteor } from 'meteor/meteor';
import { Urls } from '../imports/api/urls.js';

Router.route('/', function () {
});

// Router.route('/:_id', function () {
// 	var params = this.params;

// 	Meteor.call('urls.increment', params._id);
// 	Router.go('/');

// });

Router.route('/:_id', function() {
		const _id = this.params._id;
		const urlObj = Urls.findOne(_id);
		if(urlObj) {
			Meteor.call('urls.increment', _id);
			// Router.go('/');

			this.response.writeHead(302, {
				'Location': `http://www.${urlObj.url}`
			});
			this.response.end();
		}
	},

	{where: 'server'}
);

// FlowRouter.route('/', {
//     action: function(params, queryParams) {
//         console.log("Home page");
//     }
// });

// FlowRouter.route('/:_id', {
// 	name: 'urls',
//     action: function(params, queryParams) {
//         console.log(`id: ${params._id}`);
//         Meteor.call('urls.increment', params._id);
//         // FlowRouter.go("/", "");
//         FlowRouter.url("facebook.com");

//         // TODO: if non-existent, redirect to main page
//         // if existent reroute to asscociated route
//     }
// });