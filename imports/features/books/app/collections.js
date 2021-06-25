import { FilesCollection } from 'meteor/ostrio:files';

const UserFiles = new FilesCollection({
  collectionName: 'userfiles',
  onBeforeUpload(file) {
    // Allow upload files under 10MB, and only in png/jpg/jpeg formats
    if (UserFiles.findOne({ name: file.name, extension: file.extension })) {
      return '文件已经存在';
    }
    return true;
  },
});
export default UserFiles;

export const Books = new Mongo.Collection('books')