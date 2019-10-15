'use strict';

const _ = {
  get: require('lodash.get')
};
const fs = require('fs');
const path = require('path');
const util = require('util');

class PrintResolved {
  constructor(serverless) {
    this.provider = serverless.getProvider('aws');
    this.serverless = serverless.service;
    this.hooks = {
      'after:package:finalize': this.writeResolved.bind(this)
    };
  }

  writeResolved() {
    const { depth, path: objPath } = _.get(this.serverless, 'custom.print-resolved', {});

    const toInspect = !!objPath
      ? _.get(this.serverless, objPath || '')
      : this.serverless;

    const stringified = util.inspect(toInspect, { depth: depth || 2 });

    const filePath = path.join(
      this.serverless.serverless.config.servicePath,
      '.serverless',
      'resolved-serverless.txt'
    );
    fs.writeFileSync(filePath, stringified, 'utf-8');
  }
}

module.exports = PrintResolved;
