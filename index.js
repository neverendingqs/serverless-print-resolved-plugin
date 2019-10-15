'use strict';

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
    const stringified = util.inspect(this.serverless, { depth: 2 });
    const filePath = path.join(this.serverless.serverless.config.servicePath, '.serverless', 'resolved-serverless.txt');
    fs.writeFileSync(filePath, stringified, 'utf-8');
  }
}

module.exports = PrintResolved;
