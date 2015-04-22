/* jshint node: true */
'use strict';

function readContent(name) {
  var fs = require('fs');
  var path = require('path');

  return fs.readFileSync(path.join(process.cwd(), 'node_modules', name, 'vendor/newrelic.js'), {
    encoding: 'UTF-8'
  });
}

module.exports = {
  name: 'ember-analytics',

  contentFor: function(type, config) {
    var content = '';
    var newRelicConfig;

    if (config.environment !== 'test' && type === 'head') {
      if (!config.newRelic) {
        console.warn('`config.newRelic` is not defined, using environment variables instead.');

        var envLicenseKey = process.env['NEWRELIC_LICENSE_KEY'];
        var envApplicationId = process.env['NEWRELIC_APPLICATION_ID'];

        if (!envLicenseKey || !envApplicationId) {
          console.error('Environment variables `NEWRELIC_LICENSE_KEY` and `NEWRELIC_APPLICATION_ID` are not specfied. NewRelic will not be injected.');

          return content;
        }

        newRelicConfig = {
          licenseKey: envLicenseKey,
          applicationId: envApplicationId
        };
      } else {
        newRelicConfig = config.newRelic;
      }

      content = readContent(this.name);

      content = content.replace(/{{applicationID}}/g, newRelicConfig.applicationId);
      content = content.replace(/{{licenseKey}}/g, newRelicConfig.licenseKey);
    }

    return content;
  }
};
