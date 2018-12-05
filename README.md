![Name - Namespaced Aliases](https://raw.githubusercontent.com/alecdibble/nama/master/docs/nama.png "Nama")

# nama
Namespaced Aliases: organize and easily find aliases using autocomplete & namespacing

## About

An open-source command line utility to supercharge your aliases. Features include alias namespacing & tab autocomplete. By having easy access to all of your aliases, you can speed up your development or devOps workflow. 

## Compatability

Currently only supports the bash shell. Other shells are going to be tested & implemented in the future. Supports MacOS.

## Installation

### Installing using NPM

```
npm install -g nama
source ~/.bashrc
```

If you run into permissions errors, please run this command:

```
npm install -g nama --unsafe-perm=true
```

If that still gives permissions issues, especially to on Ubuntu, please follow [this guide](https://docs.npmjs.com/resolving-eacces-permissions-errors-when-installing-packages-globally) to fixing npm permissions issues. You should not need `sudo` to install this.

Also, make sure your shell sources `~/.bashrc` whenever a new window terminal opens. If you are running MacOS, make sure the following line is in your `~/.profile` file:

```
source ~/.bashrc
```


## Usage

![Name - Namespaced Aliases](https://raw.githubusercontent.com/alecdibble/nama/master/docs/gif1.gif "Nama Usage" | width=184)

```
a
  -Lists namepaces & shows info/help bar at top

a c [namespace]
a create [namespace]
  -Creates a namespace

a c [namespace] [alias] [command]
a create [namespace] [alias] [command]
  -Sets a command in a namespace

a rm [namespace] [alias]
a delete [namespace] [alias]
  -Deletes an alias in a namespace

a [namespace]
  -Lists commands in namespace
  
a [namespace] [alias]
  -Runs command
```

## Limitations

### Protected namespaces

  Current, you cannot use the namespace `completion` due to the mechanics of the autocompletion script. 

## ChangeLog

| Date | Version | Change Description |
| --- | --- | -- |
| 12/4/2018| 0.5.6 | Changed the way in which commands were referenced globally |
| 12/4/2018| 0.5.3 | Fixed dependency issues |
| 11/27/2018| 0.5.1 | Fixed issue with remove command |
| 11/23/2018| 0.5.0 | Updated to use the [tabtabtab](https://www.github.com/alecdibble/tabtabtab) autocompletion library |
| 11/14/2018| 0.4.0 | Refactor to utilize sqlite |
| 11/11/2018| 0.3.0 | Added default shortcut, refactor |
| 11/9/2018 | 0.2.2 | Added removal feature, updated installation script |
| 11/8/2018 | 0.1.0 | Initial release |
