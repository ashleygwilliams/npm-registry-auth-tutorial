# npm registry authentication tutorial
> an identity exercise in three practical installments

## Step 1. Get user details

In this step, we'll build a small CLI tool that takes a single argument, an npm
username and returns the email address associated with that user. 

### Setting up our project

Let's set up our project:

1. Create a directory called `npm-auth-tut`
2. `cd npm-auth-tut`
3. `npm init`. This will create a `package.json` file for us, filled with the
  default values.

Now that we have a project set up, let's begin by making a request to the npm registry.
To do this, we'll use the [`request`] package. Also, since promises are cool, let's 
promisify the request library using [`bluebird`]. To install and save these dependencies
to our project:

```
npm install request bluebird --save
```

Now, let's create a file called `details.js` and require the [`request`] library:

```js
//details.js

1  const Promise = require("bluebird");
2  const request = Promise.promisify(require("request"));
```

### Making a request to the registry

Now that we've set up our project and installed [`request`] and [`bluebird`], we're
ready to make a request to the registry.

The npm public registry API endpoint for all user requests is:

```
https://registry.npmjs.org/-/user/org.couchdb.user:<username>
```

To retrieve user details, we need to make a `GET` request to the above URL, 
replacing `<username>` with an npm username. For example, you can run this in your
browser:

```
https://registry.npmjs.org/-/user/org.couchdb.user:ag_dubs
```

and you should get back:

```json
{
  "_id": "org.couchdb.user:ag_dubs",
  "email": "ashley666ashley@gmail.com",
  "name": "ag_dubs"
}
```

Let's write this up using the [`request`] library and hard-coding an npm username:

```js
// details.js

1  const Promise = require("bluebird");
2  const request = Promise.promisify(require("request"));
3
4  const registry_user = "https://registry.npmjs.org/-/user/org.couchdb.user:";
5  const user_name = "ag_dubs";
6  const user = registry_user + user_name;
7
8  request(user).then(function(result) {
9    console.log(result.body);
10 });
```

In this code, we:

1. Store the user route, `https://registry.npmjs.org/-/user/org.couchdb.user:`,
  the username, `ag_dubs`
2. We concatenate those 2 strings to create the URL we need
3. We make a `GET` request to the URL
4. We log the body of the reponse to that request in the console

This should log the exact same thing to the console as we saw in the browser above.

### Creating a command line application

Now that we have a little application successfully retrieving data from the registry,
let's make it interactive by supplying the username from the command line instead of
hard-coding it.

The first thing we'll need to do to accomplish this is to make our application runnable
from our terminal. To do this we need to do 2 things:

1. First, we need to add a line of code that signifies that we'd like our command line
  application to run in the Node.js environment. This is akin to running our app using
  the command `node details.js`, except once we add this line to our `detail.js`, we 
  don't need to type `node` anymore:

  ```js
  //details.js

  1  #!/usr/bin/env node // <---- 
  2  
  3  const Promise = require("bluebird");
  4  const request = Promise.promisify(require("request"));  
  ...
  ```

2. Next we need to make our app executable. To do this we can write this in our 
  terminal:

  ```
  chmod +x details.js
  ```

We can test that this worked by running our app. You should be able to type this and it
should print out what it did previously. If you don't get an error, and do get a 
reponse, you know it worked!

```
details.js
```

### Retrieving the username from the command line

Currently, we have a small application that retrieves user details from the npm registry for
a hardcoded username. This is pretty cool, but not terribly flexible or useful. To improve our
application, and prepare for the next step of authenticating to the npm registry, let's set up
our application to take an argument from the command line.

To do this, we'll use a package called [`yargs`], which is a handy utility for easily parsing command
line arguments. Let's install and require [`yargs`] in our project:

```
npm install yargs --save
```

```js
// details.js

1  #!/usr/bin/env node
2  const argv = require('yargs').argv; // <----
...
```

Now we can use the yargs package to replace our hardcoded username.

```js
// details.js
...
4  const registry_user = "https://registry.npmjs.org/-/user/org.couchdb.user:";
5  const user_name = argv.user; // <----
6  const user = registry_user + user_name;
...
```

Given the code we wrote on line 5, [`yargs`] anticipates that we will pass our username data in
the terminal like so:

```
detail.js --user=<username>
```

... where we replace `<username>` with an npm username, e.g.:

```
details.js --user=ag_dubs
```

### Pretty printouts and catching errors
