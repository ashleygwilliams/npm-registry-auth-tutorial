const Promise = require("bluebird");
const request = Promise.promisify(require("request"));

const registry = "https://registry.npmjs.org";
const auth_route = registry + "/-/user/org.couchdb.user:";
const user_name = "ag_dubs";

var user_data = function(ar, un) {
  const user = ar + un;
  request(user).then(function(result) {
    const body = JSON.parse(result.body);
    const name = body.name;
    const email = body.email;
    console.log("user details\n--------------\n" +
                "name: " + name + "\n" +
                "email: " + email + "\n");
  });
};

user_data(auth_route, user_name);
