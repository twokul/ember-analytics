'use strict';

var fs   = require('fs');
var path = require('path');

var readFile = fs.readFileSync;
var exists   = fs.existsSync;

function readContent(name) {
  return readFile(path.join(process.cwd(), 'node_modules', name, 'vendor/newrelic.js'), {
    encoding: 'UTF-8'
  });
}

module.exports = function readConfig(name) {
  var config     = {};
  var content    = readContent(name);
  var configPath = path.join(process.cwd(), '.newrelic');

  if (exists(configPath)) {
    try {
      config = JSON.parse(
        readFile(configPath)
      );

      content = content.replace(/{{applicationID}}/g, config.applicationId);
      content = content.replace(/{{licenseKey}}/g, config.licenseKey);
    } catch(e) {
      throw new Error('`.newrelic` config file is malformed: ' + e.message);
    }
  } else {
    throw new Error('Please, check if `.newrelic` configuration file exists.');
  }

  return content;
};
