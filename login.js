#!/usr/bin/env node
const argv = require('yargs').argv;

const Promise = require("bluebird");
const request = Promise.promisify(require("request"));

const registry = "https://registry.npmjs.org";
const auth_route = registry + "/-/user/org.couchdb.user:";

var login_user = function(ar) {
  const un = argv.user || "";
  const password = argv.password || "";
  const email = argv.email || "";
  const user = ar + un;
  
  request({
    method: 'PUT',
    uri: user,
    headers: {
      "Content-Type": "application/json",
    },
    body: {
      name: un,
      email: email,
      auth_token: true,
      password: password
    },
    json: true
  }).then(function(result) {
    if (result.statusCode == 201) {
      console.log(result.body);
    } else {
      console.log("ERROR\n--------------\n" +
                  "Status Code: " + result.statusCode + "\n" +
                  "Message: " + result.statusMessage + "\n");
    }
  });
};

login_user(auth_route);
