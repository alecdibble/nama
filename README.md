<img src="https://raw.githubusercontent.com/alecdibble/nama/master/docs/nama.png" width="200">

# nama
Namespaced Aliases: organize and easily find aliases using autocomplete & namespacing

[![npm](https://img.shields.io/npm/v/nama.svg)](https://www.npmjs.com/package/nama)
[![npm](https://img.shields.io/npm/l/nama.svg)](https://github.com/faressoft/nama/blob/master/LICENSE)
[![Join the chat at https://gitter.im/namespaced-aliases/community](https://badges.gitter.im/namespaced-aliases/community.svg)](https://gitter.im/namespaced-aliases/community?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
[![](https://tokei.rs/b1/github/alecdibble/nama)](https://github.com/alecdibble/nama)


## About

An open-source command line utility to supercharge your aliases. Features include alias namespacing & tab autocomplete. By having easy access to all of your aliases, you can speed up your development or devOps workflow. 

## Cloud Sync

Cloud synchronization functionality is now in beta-testing, utilizing `nama-sync` through the AliaSync service. More information can found at the [nama-sync](https://github.com/alecdibble/nama-sync) repository.

## Compatability

Currently only supports the bash shell. Other shells are going to be tested & implemented in the future.

## Installation

### Installing using NPM

```
npm install -g nama
nama-install
source ~/.bashrc
```

If you run into permissions errors, please run this command:

```
npm install -g nama --unsafe-perm=true
```

If that still gives permissions issues, please follow [this guide](https://docs.npmjs.com/resolving-eacces-permissions-errors-when-installing-packages-globally) to fixing npm permissions issues. You should not need `sudo` to install this.

### Installing on Ubuntu

```
sudo apt-get install build-essential
npm install -g nama
nama-install
source ~/.bashrc
```

If you run into permissions issues, please follow [this guide](https://docs.npmjs.com/resolving-eacces-permissions-errors-when-installing-packages-globally) to fixing npm permissions issues. You should not need `sudo` to install this.

### Installing on MacOS

Also, make sure your shell sources `~/.bashrc` whenever a new window terminal opens. If you are running MacOS, make sure the following line is in your `~/.bash_profile` file:

```
[ -r ~/.bashrc ] && . ~/.bashrc
```

You can easily add it by running this command:

```
echo '[ -r ~/.bashrc ] && . ~/.bashrc' >> ~/.bash_profile
```


## Usage

![Name - Namespaced Aliases](https://raw.githubusercontent.com/alecdibble/nama/master/docs/gif1.gif "Nama Usage")

### List all namespaces

`na`

### Create & deleting namespaces

To create a namespace:
`na c [namespace-name]` or `na create [namespace-name]`

To delete an existing namespace:
`na rm [namespace-name]` or `na delete [namespace-name]`

### Creating a new alias in a namespace

`na c [namespace] [alias] [command]` or `na create [namespace] [alias] [command]`

### Running an alias

`na [namespace] [alias]`

## Running an alias in the current console

If you want to run a command like `cd` that will affect your current console, you must use the `nac` command. Currently, the mechanism that allows the `nac` command to work makes the autocomplete situation intermittent. 

```
na c test1 gohome 'cd ~/'
nac test1 gohome
```


Please file an issue or PR if you find a potential solution to this problem.

### Reference

```
nama - namespaced aliases
       Store, quickly access, and organize
       your aliases. Auto-complete too!

na [-a] [namespace]
     (-a)            Lists all commands for all namespaces
     [namespace]     List commands for the namespace


na c [namespace]
na create [namespace]
     Creates a namespace/folder to organize your aliases
       Example:     na c utils

na c [namespace] [alias] "[command]"<-Enclosed in quotes
na create [namespace] [alias] "[command]"<-Enclosed in quotes
     Creates an alias in a namespace
       Example:     na c utils echo_info "echo 'info'"

na [namespace] [alias]
     Runs your alias
       Example: a utils echo_info

nac [namespace] [alias]
     Runs your alias in the current console
     Lets commands like cd work correctly

     Note: autocomplete work intermittently for commands
     in this mode

na rm [namespace] [alias]
na delete [namespace] [alias]
     Deletes an alias in a namespace

```

You can also use `nama` in the place of `na` for any command above.

## Limitations

### Protected namespaces

  Current, you cannot use the namespace `completion` due to the mechanics of the autocompletion script. 

## ChangeLog

| Date | Version | Change Description |
| --- | --- | -- |
| 3/1/2019 | 0.9.0 | Added nac command to handle commands like cd, added warning, removed old na alias, added invalid character validations |
| 2/23/2019 | 0.8.1 | Fixed issue with running commands in current shell, Fixed bug with sqlite table init |
| 2/23/2019 | 0.8.0 | Changed `a` command to `na` to help prevent unintended errors with other commands |
| 2/19/2019 | 0.7.0 | Integrated with nama-sync |
| 2/8/2019| 0.6.2 | Changed the way installation works |
| 2/6/2019| 0.6.1 | Fixed small bug introduced during the merge |
| 2/5/2019| 0.6.0 | Sped up autocomplete functionality significantly |
| 12/4/2018| 0.5.6 | Changed the way in which commands were referenced globally |
| 12/4/2018| 0.5.3 | Fixed dependency issues |
| 11/27/2018| 0.5.1 | Fixed issue with remove command |
| 11/23/2018| 0.5.0 | Updated to use the [tabtabtab](https://www.github.com/alecdibble/tabtabtab) autocompletion library |
| 11/14/2018| 0.4.0 | Refactor to utilize sqlite |
| 11/11/2018| 0.3.0 | Added default shortcut, refactor |
| 11/9/2018 | 0.2.2 | Added removal feature, updated installation script |
| 11/8/2018 | 0.1.0 | Initial release |
