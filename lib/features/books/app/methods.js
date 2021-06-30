import { Meteor } from "meteor/meteor";
import { SimpleSchema } from "meteor/aldeed:simple-schema";
import { Books, Notes } from "./collections";
import UserFiles from "./collections";

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
  ["files.remove"](args) {
    console.log("args", args);
    new SimpleSchema({
      _id: { type: String },
      fileId: { type: String },
    }).validate(args);
    const { _id, fileId } = args;
    Books.remove({ _id });
    UserFiles.remove({ _id: fileId });
  },
  ["books.insert"](args) {
    const { bookId, userId } = args;
    const userBookLinker = Meteor.users.getLink(userId, "books");
    userBookLinker.add(bookId);
  },
  ["books.remove"](args) {
    const { bookId, userId } = args;
    const userBookLinker = Meteor.users.getLink(userId, "books");
    userBookLinker.remove(bookId);
  },
  ["notes.insert"](args) {
    const { bookId, userId, note } = args;
    Notes.insert({
      bookId,
      userId,
      note,
    });
  },
  ["notes.remove"](args) {
    const { _id } = args;
    Notes.remove({ _id });
  },
  ["download"]({ id }) {
    console.log("成功", UserFiles.findOne({ _id: id }).link());
    return {
      url: UserFiles.findOne({ _id: id }).link(),
    };
  },
});
