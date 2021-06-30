import { Meteor } from "meteor/meteor";
import { Accounts } from "meteor/accounts-base";
import { Roles } from "meteor/alanning:roles";
import { JsonRoutes } from "meteor/simple:json-routes";
import "./lib/features/auth/hook";
import "./lib/features/users";
import "./lib/features/users/server.js";
import "./lib/features/books";
import "./lib/features/books/server.js";
if (Meteor.isServer) {
  Meteor.startup(() => {
    let users = [
      {
        username: "admin",
        email: "null",
        roles: ["admin"],
      },
      {
        username: "maintainer",
        email: "1309014381@qq.com",

        profile: {
          displayName: "郑达",
          phone: "13052202624",
          remark: "有什么事情可以找我,我是开发者",
        },
        roles: ["admin"],
      },
    ];
    users.forEach(function (user) {
      if (!Meteor.users.findOne({ username: user.username })) {
        let id;
        id = Accounts.createUser({
          ...user,
          password: "123456",
        });
        if (Meteor.roleAssignment.find({ "user._id": id }).count() === 0) {
          user.roles.forEach(function (role) {
            Roles.createRole(role, { unlessExists: true });
          });
          Roles.addUsersToRoles(id, user.roles);
        }
      }
    });
    // JsonRoutes.Middleware.use('/users',JsonRoutes.Middleware.parseBearerToken)
    // JsonRoutes.Middleware.use('/users',JsonRoutes.Middleware.authenticateMeteorUserByToken)
    // JsonRoutes.Middleware.use('/books',JsonRoutes.Middleware.parseBearerToken)
    // JsonRoutes.Middleware.use('/books',JsonRoutes.Middleware.authenticateMeteorUserByToken)
    // JsonRoutes.Middleware.use('/methods',JsonRoutes.Middleware.parseBearerToken)
    // JsonRoutes.Middleware.use('/methods',JsonRoutes.Middleware.authenticateMeteorUserByToken)
    JsonRoutes.setResponseHeaders({ 
      "Cache-Control": "no-store",
      Pragma: "no-cache",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, PUT, POST, DELETE, OPTIONS",
      "Access-Control-Allow-Headers":
        "Content-Type, Authorization, X-Requested-With",
    });
    JsonRoutes.add("OPTIONS", "books/users/:0", (req, res, next) => {
      JsonRoutes.sendResult(res, {
        headers: {
          // enable CORS
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, PUT, POST, DELETE, OPTIONS",
          "Access-Control-Allow-Headers":
            "Content-Type, Authorization, X-Requested-With",
        },
      });
    });
    JsonRoutes.add("OPTIONS", "methods/download", (req, res, next) => {
      JsonRoutes.sendResult(res, {
        headers: {
          // enable CORS
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, PUT, POST, DELETE, OPTIONS",
          "Access-Control-Allow-Headers":
            "Content-Type, Authorization, X-Requested-With",
        },
      });
    });
  });
}
