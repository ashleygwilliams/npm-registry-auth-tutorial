#!/usr/bin/env node
const argv = require('yargs').argv;

const Promise = require("bluebird");
const request = Promise.promisify(require("request"));

const registry = "https://registry.npmjs.org";
const auth_route = registry + "/-/user/org.couchdb.user:";

var user_data = function(ar) {
  const un = argv.user;
  const user = ar + un;
  
  request(user).then(function(result) {
    if (!result.statusCode === 200) {
      const body = JSON.parse(result.body);
      const name = body.name;
      const email = body.email;
      console.log("user details\n--------------\n" +
                  "name: " + name + "\n" +
                  "email: " + email + "\n");
    } else {
      console.log("ERROR\n--------------\n" +
                  "Status Code: " + result.statusCode + "\n" +
                  "Message: " + result.statusMessage + "\n");
    }
  });
};

user_data(auth_route);
