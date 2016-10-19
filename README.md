# npm registry authentication tutorial
> an identity exercise in three practical installments

In this tutorial, we'll get acquainted with authenticating to the npm
registry by building 3 small command line tools:

- `details`: The first tool we'll build is a tool that retrieves an npm user's email
  address. This will help us get acquainted with the [`yargs`] and [`request`]
  libraries, as well as explore the read-only parts of the npm registry's
  user interface. ([source](/1-details))
- `token`: Next, we'll build a tool that returns an auth token given an npm
  username and password. ([source](/2-token))
- `publish`: Lastly, we'll build a small publishing tool that uses the auth token
  we received in the previous tool to authenticate to the npm registry
  and publish a package. ([source](/3-publish))

[`yargs`]: http://yargs.js.org/
[`request`]: https://github.com/request/request
