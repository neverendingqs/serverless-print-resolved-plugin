'use strict';

const _ = {
  get: require('lodash.get')
};
const fs = require('fs');
const path = require('path');

const yaml = require('js-yaml');

class PrintResolved {
  constructor(serverless) {
    this.provider = serverless.getProvider('aws');
    this.serverless = serverless.service;
    this.hooks = {
      'after:package:finalize': this.writeResolved.bind(this)
    };
  }

  getOriginal() {
    const filePath = path.join(
      this.serverless.serverless.config.servicePath,
      'serverless.yml'
    );

    const stringified = fs.readFileSync(filePath, 'utf-8');
    return yaml.safeLoad(stringified);
  }

  writeResolved() {
    const keysToInclude = new Set(
      Object.keys(
        this.getOriginal()
      )
    );

    const filtered = Object.entries(this.serverless)
      .filter(([key])=> keysToInclude.has(key))
      .reduce(
        (acc, [key, value]) => Object.assign(acc, { [key]: value }),
        {}
      );

    const stringified = yaml.safeDump(filtered);

    const filePath = path.join(
      this.serverless.serverless.config.servicePath,
      '.serverless',
      'serverless-resolved.yml'
    );
    fs.writeFileSync(filePath, stringified, 'utf-8');
  }
}

module.exports = PrintResolved;
