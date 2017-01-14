import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Developments = new Mongo.Collection('developments');

if (Meteor.isServer) {
  // This code only runs on the server
  // Only publish developments that are public or belong to the current user
  Meteor.publish('developments', function developmentsPublication() {
       return Developments.find({});
  });
}
Meteor.methods({
  'developments.insert'(text) {
    check(text, String);
    Developments.insert({
      text,
      createdAt: new Date(),
      checked : "false"
    });
  },
  'developments.remove'(developmentId) {
    check(developmentId, String);
    Developments.remove(developmentId);
  },
  'developments.setChecked'(developmentId, setChecked) {
    check(developmentId, String);
    check(setChecked, Boolean);
    Developments.update(developmentId, { $set: { checked: setChecked } });
  }
});