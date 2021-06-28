import { Meteor } from "meteor/meteor";
import { JsonRoutes } from "meteor/simple:json-routes";
if (Meteor.isServer) {
  Meteor.startup(() => {
    import "./lib/features/auth/hook";
    import "./lib/features/users";
    import "./lib/features/users/server.js";
    import "./lib/features/books";
    import "./lib/features/books/server.js";
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
    JsonRoutes.add("OPTIONS", "download/:0", (req, res, next) => {
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
