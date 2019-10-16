# serverless-print-resolved-plugin

## Usage

Install the plugin:

```sh
npm install -D serverless-print-resolved-plugin
```

Register the plugin in `serverless.yml`:

```yaml
plugins:
  - serverless-print-resolved-plugin
```

After `package`, `.serverless/serverless-resolved.yml` will contain a copy of
`serverless.yml` but with all varaibles resolved.

To include more metadata in the `serverless` object, add the following to
`serverless.yml`:

```yaml
custom:
  print-resolved:
    # Paths are followed using `lodash.get()`
    paths:
      - serverless.pluginManager.hooks
      - serverless.variables.option
```

Note: objects / properties considered invalid by
[js-yaml](https://github.com/nodeca/js-yaml) are skipped.
