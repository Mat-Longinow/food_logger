// https://www.geeksforgeeks.org/how-to-use-an-es6-import-in-node-js/
require = require("esm")(module);
module.exports = require("./index.js");