import { Meteor } from 'meteor/meteor';
if (Meteor.isClient) {
  import "./app/core";
  import "./lib/features/users";
  import "./lib/features/books";
}
