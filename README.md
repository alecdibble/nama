# na
Namespaced Aliases, Supercharged

## About

An open-source command line utility to supercharge your aliases. Features include alias namespacing & tab autocomplete. By having easy access to all of your aliases, you can speed up your development or devOps workflow. 

## Usage

```
na
  -Lists namepaces & shows info/help bar at top

na create [namespace]
  -Creates a namespace

na create [namespace] [alias] [command]
  Sets a command in a namespace

na [namespace]
  -Lists commands in namespace
  
na [namespace] [alias]
  -Runs command
```

## Limitations

### Protected namespaces

  Current, you cannot use the namespace `completion` due to the mechanics of the autocompletion script. 
