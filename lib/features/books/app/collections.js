import { FilesCollection } from "meteor/ostrio:files";

const UserFiles = new FilesCollection({
  collectionName: "userfiles",
  onBeforeUpload(file) {
    // Allow upload files under 10MB, and only in png/jpg/jpeg formats
    if (UserFiles.findOne({ name: file.name, extension: file.extension })) {
      return "文件已经存在";
    }
    return true;
  },
});
export default UserFiles;

export const Books = new Mongo.Collection("books");
// Books.addLinks({
//   'users': {
//     type: "many",
//     collection: Meteor.users,
//     field: 'userIds',
//   },
// });
// Meteor.users.addLinks({
//   'books': {
//       collection: Books,
//       inversedBy: 'users'
//   }
// })
Books.addLinks({
  users: {
    collection: Meteor.users,
    inversedBy: "books",
  },
});
Meteor.users.addLinks({
  books: {
    collection: Books,
    field: "bookIds",
    type: "many",
  },
});

export const UsersBooks = new Mongo.Collection("usersbooks");
