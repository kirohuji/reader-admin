import { Meteor } from "meteor/meteor";
import { Books, Notes } from "./collections";
import UserFiles from "./collections";

Meteor.publish("userfiles", function () {
  return UserFiles.find({}, { sort: { name: 1 } }).cursor;
});
Meteor.publish(
  "books",
  function (limit) {
    if (limit) {
      return Books.find({}, { sort: { name: 1 }, limit });
    } else {
      return Books.find({}, { sort: { name: 1 } });
    }
  },
  {
    url: "books",
    httpMethod: "get",
  }
);
Meteor.publish(
  "booksByUserId",
  function (userId) {
    return Books.find({
      _id: {
        $in: Meteor.users.findOne({
          _id: userId,
        }).bookIds,
      },
    });
  },
  {
    url: "books/users/:0",
    httpMethod: "get",
  }
);
Meteor.publish(
  "usersbooks",
  function () {
    return Meteor.users.find(
      {},
      {
        fields: {
          bookIds: 1,
        },
      }
    );
  },
  {
    url: "usersbooks",
    httpMethod: "get",
  }
);
Meteor.publish(
  "notes",
  function (userId, bookId) {
    console.log("我被请求了");
    return Notes.find(
      {
        userId,
        bookId,
      },
      {}
    );
  },
  {
    url: "note/:0/:1",
    httpMethod: "post",
  }
);
