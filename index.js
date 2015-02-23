/* jshint node: true */
'use strict';

var readConfig = require('./lib/config');

module.exports = {
  name: 'ember-analytics',

  contentFor: function(type) {
    if (type === 'head') {
      return readConfig(this.name);
    }

    return '';
  }
};
