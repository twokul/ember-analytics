/* jshint node: true */
'use strict';

var readConfig = require('./lib/config');

module.exports = {
  name: 'ember-analytics',

  contentFor: function(type, config) {
    if (config.environment !== 'test' && type === 'head') {
      return readConfig(this.name);
    }

    return '';
  }
};
