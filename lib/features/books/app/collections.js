import { FilesCollection } from "meteor/ostrio:files";

const UserFiles = new FilesCollection({
  collectionName: "userfiles",
  responseHeaders(responseCode, fileRef, versionRef, version, http) {
    const headers = {};
    headers['Content-Type'] = versionRef.type || 'application/octet-stream';
    headers['Accept-Ranges'] = 'bytes';
    headers['Access-Control-Allow-Origin'] = '*';// <-- Custom header
    return headers;
  },
  onBeforeUpload(file) {
    // Allow upload files under 10MB, and only in png/jpg/jpeg formats
    if (UserFiles.findOne({ name: file.name, extension: file.extension })) {
      return "文件已经存在";
    } else if (file.extension != "epub") {
      return "只支持epub格式的书籍上传";
    } else return true;
  },
});
export default UserFiles;

export const Books = new Mongo.Collection("books");
export const Notes = new Mongo.Collection("notes");
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
// Books.addLinks({
//   notes: {
//     collection: Notes,
//     inversedBy: "books",
//   },
// });

// Notes.addLinks({
//   books: {
//     collection: Books,
//     field: "bookIds",
//     type: "many",
//   },
// });
