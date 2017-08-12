tapdown
=======

tapdown is a life counter application intended to be run from a webpage.


Dependencies
------------

Dependencies are managed with `yarn`. Ensure you do not install dependencies
with `NODE_ENV=production`, or you will not be able to build tapdown.


Building
--------

You can build tapdown via the following:

```sh
NODE_ENV=production yarn run webpack
```


Development
-----------

You can run a development server via:

```sh
yarn run webpack-dev-server
```
