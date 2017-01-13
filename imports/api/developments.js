import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Developments = new Mongo.Collection('developments');

if (Meteor.isServer) {
  // This code only runs on the server
  // Only publish developments that are public or belong to the current user
  Meteor.publish('developments', function developmentsPublication() {
       return Developments.find({
      $or: [
        { private: { $ne: true } },
        { owner: this.userId },
      ],
    });
  });
}
Meteor.methods({
  'developments.insert'(text) {
    check(text, String);

    // Make sure the user is logged in before inserting a development
    if (! this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    Developments.insert({
      text,
      createdAt: new Date(),
      owner: this.userId,
      username: Meteor.users.findOne(this.userId).username,
    });
  },
  'developments.remove'(developmentId) {
    check(developmentId, String);
    const development = Developments.findOne(developmentId);
    if (development.private && development.owner !== this.userId) {
      // If the development is private, make sure only the owner can delete it
      throw new Meteor.Error('not-authorized');
    }
    Developments.remove(developmentId);
  },
  'developments.setChecked'(developmentId, setChecked) {
    check(developmentId, String);
    check(setChecked, Boolean);
    
    const development = Developments.findOne(developmentId);
    if (development.private && development.owner !== this.userId) {
      // If the development is private, make sure only the owner can check it off
      throw new Meteor.Error('not-authorized');
    }
    Developments.update(developmentId, { $set: { checked: setChecked } });
  },
   'developments.setPrivate'(developmentId, setToPrivate) {
    check(developmentId, String);
    check(setToPrivate, Boolean);
 
    const development = Developments.findOne(developmentId);
 
    // Make sure only the development owner can make a development private
    if (development.owner !== this.userId) {
      throw new Meteor.Error('not-authorized');
    }
 
    Developments.update(developmentId, { $set: { private: setToPrivate } });
  },
});