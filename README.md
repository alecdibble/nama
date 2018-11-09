# nama
Namespaced Aliases, Supercharged

## About

An open-source command line utility to supercharge your aliases. Features include alias namespacing & tab autocomplete. By having easy access to all of your aliases, you can speed up your development or devOps workflow. 

## Usage

```
a
  -Lists namepaces & shows info/help bar at top

a create [namespace]
  -Creates a namespace

a create [namespace] [alias] [command]
  Sets a command in a namespace

a [namespace]
  -Lists commands in namespace
  
a [namespace] [alias]
  -Runs command
```

## Limitations

### Protected namespaces

  Current, you cannot use the namespace `completion` due to the mechanics of the autocompletion script. 
