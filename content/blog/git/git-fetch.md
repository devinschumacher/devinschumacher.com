---
slug: /git-fetch/
title: git fetch
date: '2023-01-16'
categories:
  - git
  - programming
category: Git
---

**`git fetch`** downloads the files, commits, tags, and branches from the remote repository to your local machine without overwriting any of your existing local code in the current branch.

it also grabs a record of all remote repository changes, so you can see any updates and differences before actually pulling down (and overwriting) what you have been working on.

>
> `git fetch` **is a great way to avoid merge conflicts, because you're able to spot & address any potential issues before you merge them.**

## syntax

`git fetch` has a number of different options that can be used with it.

## git fetch options

```bash
git fetch <options> <remote-name> <branch-name />
```

for a list of all the options available with `git fetch` run the following command in the shell:

```bash
git fetch --help
```

## workflow

use `git fetch` to retrieve the latest iteration of your project from the remote repository and examine any updates, changes, etc. from your current copy of project files.

when you're ready to get your repository up-to-date with the remote repository (so you can push up any changes you've made, or just start working with the most updated version) use git [merge to combine](https://devinschumacher.com/how-to-combine-merge-multiple-csv-or-excel-files-for-mac-pc/) the fetched data with yours.

this makes `git fetch` a great way to avoid merge conflicts while collaborating with a team, because you're able to spot any potential problems and address them before you merge codebases.

example:

```bash
git fetch origin
```


here we ran a `git fetch origin` to fetch the repo origin.

a simple `git fetch` would have done the same thing, as it default to the origin if you don't specify a branch.

to fetch a specific branch, run:

```bash
git fetch <remote-name> <branch-name />
```

like:

```bash
git fetch origin test-branch
```


there was no test-branch in this repository, but you can see the command was successfully executed.

### git fetch to get your local repository in sync

here are the steps to take for getting your local repository in sync with the remote repository.

1\. `git fetch` to fetch the remote repository:

```bash
git fetch
```

2\. `git log` to compare your local branch with the remote:

```bash
git log --oneline --graph --decorate --all
```

3\. `git checkout` to checkout the local branch where you'll be merging the changes to:

```bash
git checkout main
```

4\. `git merge` to merge the changes:

```bash
git merge origin/main
```
