/* eslint-env node */
'use strict';

var path = require('path');
var Funnel = require('broccoli-funnel');
var MergeTrees = require('broccoli-merge-trees');

module.exports = {
  name: 'ember-cli-password-strength',

  included(app) {
    this._super.included.apply(this, arguments);

    var app;

    // If the addon has the _findHost() method (in ember-cli >= 2.7.0), we'll just
    // use that.
    if (typeof this._findHost === 'function') {
      app = this._findHost();
    } else {
      // Otherwise, we'll use this implementation borrowed from the _findHost()
      // method in ember-cli.
      var current = this;
      do {
        app = current.app || app;
      } while (current.parent.parent && (current = current.parent));
    }

    app.import('vendor/zxcvbn.js');
    app.import('vendor/shims/password-strength.js');
  },

  treeForVendor(vendorTree) {
    var zxcvbnTree = new Funnel(path.dirname(require.resolve('zxcvbn/dist/zxcvbn.js')), {
      files: ['zxcvbn.js', 'zxcvbn.js.map'],
    });

    return new MergeTrees([vendorTree, zxcvbnTree]);
  },
};
