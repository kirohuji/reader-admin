import { Meteor } from "meteor/meteor";
import { Books, UsersBooks } from "./collections";
import UserFiles from "./collections";

Meteor.publish("userfiles", function () {
  return UserFiles.find({}, { sort: { name: 1 } }).cursor;
});
Meteor.publish("books", function (limit) {
  if (limit) {
    return Books.find({}, { sort: { name: 1 }, limit });
  } else {
    return Books.find({}, { sort: { name: 1 } });
  }
});
Meteor.publish("usersbooks", function () {
  return Meteor.users.find(
    {},
    {
      fields: {
        bookIds: 1,
      },
    }
  );
});
Meteor.publishComposite("booksByUserId", function (userId) {
  console.log("userId", userId);
  return {
    find() {
      return Books.find({}, { sort: { name: 1 } });
    },
    children: [
      {
        find(list) {
          return UsersBooks.find(
            {
              userId: userId,
              bookId: list._id,
            },
            {
              fields: {
                userId: 1,
              },
            }
          );
        },
      },
    ],
  };
});
Meteor.publishComposite("myBooks", function (userId) {
  return {
    find() {
      return UsersBooks.find({ userId });
    },
    children: [
      {
        find(list) {
          return Books.find({
            _id: list.bookId,
          });
        },
      },
    ],
  };
});
