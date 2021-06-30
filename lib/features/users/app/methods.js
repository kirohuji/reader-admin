import { Meteor } from "meteor/meteor";
import { Roles } from "meteor/alanning:roles";
import _ from "lodash";
Meteor.methods({
  ["users.remove"]({ _id }) {
    if (!Roles.userIsInRole(this.userId, ["owner", "admin"])) {
      throw new Meteor.Error(
        "not-allowed",
        "You are not allowed to remove users"
      );
    }

    if (!_id) {
      throw new Meteor.Error(
        "invalid-parameter",
        `Invalid parameter _id. Expected a string, but ${typeof _id} given`
      );
    }

    if (Roles.userIsInRole(this.userId, "owner") && this.userId === _id) {
      throw new Meteor.Error(
        "invalid-action",
        "You cannot remove yourself while you are the owner of the system. Transfer ownership first"
      );
    }

    Meteor.users.remove({ _id });
  },
  ["users.save"](user) {
    let tUser = Meteor.users.findOne({ _id: user._id });
    if (tUser) {
      if (user.password) {
        let password = user.password;
        Meteor.users.update({ _id: user._id }, _.merge(tUser, user));
        delete user.password;
        delete tUser.services.password;
        if (!this.isSimulation) {
          Accounts.setPassword(user._id, String(password));
        }
      } else {
        Meteor.users.update({ _id: user._id }, _.merge(tUser, user));
      }
    } else {
      let id = Accounts.createUser({
        ...user,
        email: `${user.username}@qq.com`,
        password: String(user.password),
      });
      console.log("id", id);
    }
  },
});
