import { Meteor } from 'meteor/meteor';
import { Urls } from '../imports/api/urls.js';

Router.route('/', function () {
});

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