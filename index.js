'use strict';

const _ = {
  get: require('lodash.get'),
  set: require('lodash.set')
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
    const { paths } = _.get(this.serverless, 'custom.print-resolved', {});

    const keysToInclude = new Set(
      Object.keys(
        this.getOriginal()
      )
    );

    const base = Object.entries(this.serverless)
      .filter(([key])=> keysToInclude.has(key))
      .reduce(
        (acc, [key, value]) => Object.assign(acc, { [key]: value }),
        {}
      );

    const merged = paths.reduce(
      (acc, path) => {
        const value = _.get(this.serverless, path);
        _.set(acc, path, value);
        return acc;
      },
      base
    );

    const stringified = yaml.safeDump(merged, { skipInvalid: true });

    const filePath = path.join(
      this.serverless.serverless.config.servicePath,
      '.serverless',
      'serverless-resolved.yml'
    );
    fs.writeFileSync(filePath, stringified, 'utf-8');
  }
}

module.exports = PrintResolved;
