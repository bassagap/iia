import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Businesses = new Mongo.Collection('businesses');

if (Meteor.isServer) {
  // This code only runs on the server
  // Only publish businesses that are public or belong to the current user
  Meteor.publish('businesses', function businessesPublication() {
       return Businesses.find({});
  });
}
Meteor.methods({
  'businesses.insert'(text) {
    check(text, String);
    Businesses.insert({
      text,
      createdAt: new Date(),
      checked : "false"
    });
  },
  'businesses.remove'(businessId) {
    check(businessId, String);
    Businesses.remove(businessId);
  },
  'businesses.setChecked'(businessId, setChecked) {
    check(businessId, String);
    check(setChecked, Boolean);
    Businesses.update(businessId, { $set: { checked: setChecked } });
  }
});