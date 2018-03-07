import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Urls = new Mongo.Collection('urls');

if (Meteor.isServer) {
	Meteor.publish('urls', function urlsPublication() {
		return Urls.find({});
	});
}

Meteor.methods({
	'urls.insert'(url) {
    	check(url, String);

    	url = url.replace(/^(?:https?:\/\/)?(?:www\.)?/i, "");
    	Urls.insert({
      		url,
      		createdAt: new Date(),
      		count: 0
    	});
    	return Urls.findOne({url: url})._id;
    },
	'urls.increment'(id) {
		check(id, String);

		Urls.update(id, { $inc: { count: 1 } });
	},
});