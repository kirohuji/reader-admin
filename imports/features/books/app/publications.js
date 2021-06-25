import { Meteor } from "meteor/meteor";
import { Books } from "./collections";
import UserFiles from "./collections";


Meteor.publish("userfiles", function () {
  return UserFiles.find({}, { sort: { name: 1 } }).cursor;
});
Meteor.publish("books", function () {
  return Books.find({}, { sort: { name: 1 } });
});