import { Meteor } from "meteor/meteor";
import { SimpleSchema } from "meteor/aldeed:simple-schema";
import { Books } from "./collections";
import UserFiles from "./collections";
import { Roles } from "meteor/alanning:roles";

Meteor.methods({
  RemoveFile({ _id }) {
    UserFiles.remove({ _id });
  },
  // eslint-disable-next-line meteor/audit-argument-checks
  RenameFile(id, newName) {
    const _id = id;
    UserFiles.update({ _id }, { $set: { name: newName } });
  },
});

Meteor.methods({
  ["books.add"](args) {
    Books.insert({
      ...args,
      created: new Date(),
    });
  },

  ["books.remove"](args) {
    new SimpleSchema({
      _id: { type: String },
    }).validate(args);

    const { _id } = args;

    Books.remove(_id);
  },
});
