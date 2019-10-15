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

The resolved `serverless.yml` will be in `.serverless/resolved-serverless.txt`.

Configs:

```yaml
custom:
  ...
  print-resolved:
    # will inspect up to x levels deep
    # passed into util.inspect()
    depth: 2

    # path to object you want to inspect
    # passed into lodash.get()
    path: ''
```

Example to get all hooks and plugins:

```yaml
custom:
  print-resolved:
    depth: 2
    path: serverless.pluginManager.hooks
```
