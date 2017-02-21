sol-common-footer
==============================

[![Greenkeeper badge](https://badges.greenkeeper.io/soldotno/sol-common-footer.svg?token=8df8234708883ad475a7e9272b9d8f57824586d24311183f7a230c492179083d)](https://greenkeeper.io/)

This is our standard footer
It uses react.

We do not edit css in this repo, we fetch it from https://github.com/soldotno/sol-style-guide

The dist-directory will be installed upon 

##### Development

It has a build step to generate dist-files.  Run ```npm run makedist```
It will convert code from ES2015/ES6 to ES5

##### Publish

Commit your changes.

To upgrade to a new version do ```npm version [major|minor|patch]```
this will bump the version in package.json up to a new version and commit the change.

Then push to your branch (it is not possible to push to master)

You will publish by doing a pull-request to master.  When merged to master the new version is available.
