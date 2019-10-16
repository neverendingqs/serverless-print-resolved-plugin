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
