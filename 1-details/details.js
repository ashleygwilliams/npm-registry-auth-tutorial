#!/usr/bin/env node
const argv = require('yargs').argv;

const Promise = require("bluebird");
const request = Promise.promisify(require("request"));

const registry_user = "https://registry.npmjs.org/-/user/org.couchdb.user:";
const user_name = argv.user;
const user = registry_user + user_name;

var details = function(user) {
  request(user).then(function(result) {
    if (result.statusCode == 200) {
      const body = JSON.parse(result.body);
      const name = body.name;
      const email = body.email;
      console.log("\n" +
                  "user details\n--------------\n" +
                  "name: " + name + "\n" +
                  "email: " + email + "\n");
    } else {
      console.log("\n" + 
                  "ERROR\n--------------\n" +
                  "Status Code: " + result.statusCode + "\n" +
                  "Message: " + result.statusMessage + "\n");
    }
  });
};

details(user);
