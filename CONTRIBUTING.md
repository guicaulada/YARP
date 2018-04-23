# How to contribute
We welcome contributions from the community and are pleased to have them.  
Please follow this guide when logging issues or making code changes.

## Logging Issues
All issues should be created using the [new issue form](https://github.com/Sighmir/YARP/issues/new).  
Clearly describe the issue following the template provided.

## Patching Code
Code changes are welcome and should follow the guidelines below.

* Fork the repository on GitHub.
* Fix the issue ensuring that your code follows the [style guide](https://github.com/Sighmir/YARP/master/STYLE.md).
* Test your new code ensuring that it doesn't cause any problems.
* Make your [pull request](https://github.com/Sighmir/YARP/pulls/new) to the [master branch](https://github.com/Sighmir/YARP/tree/master).
* Follow the pull request template.

## <a name="rules"></a> Coding Rules

To ensure consistency throughout the source code, keep these rules in mind as you are working:

* All features or bug fixes **must be tested**.
* All public API methods **must be documented** with [jsdoc](http://usejsdoc.org/). To see how we document our APIs, please check out the existing source code.
* With a few exceptions, we try to follow the rules contained in the [style guide](https://github.com/Sighmir/YARP/master/STYLE.md).

## <a name="commits"></a> Git Commit Guidelines

We have very precise rules over how our git commit messages can be formatted.  This leads to **more readable messages** that are easy to follow when looking through the **project history**.  But also, we plan to use the git commit messages to **generate a change log**.

### Commit Message Format
Each commit message consists of a **header**, a **body** and a **footer**.  
The header has a special format that includes a **type**, a **scope** and a **subject**:

```
<type>(<scope>): <subject>
<BLANK LINE>
<body>
<BLANK LINE>
<footer>
```

The **header** is mandatory and the **scope** of the header is optional.

Any line of the commit message cannot be longer 100 characters! This allows the message to be easier
to read on GitHub as well as in various git tools.

### Revert
If the commit reverts a previous commit, it should begin with `revert: `, followed by the header
of the reverted commit.
In the body it should say: `This reverts commit <hash>.`, where the hash is the SHA of the commit
being reverted.
A commit with this format is automatically created by the [`git revert`](https://git-scm.com/docs/git-revert) command.

### Type
Must be one of the following:

* **feat**: A new feature
* **fix**: A bug fix
* **docs**: Documentation only changes
* **style**: Changes that do not affect the meaning of the code (white-space, formatting, missing
  semi-colons, etc)
* **refactor**: A code change that neither fixes a bug nor adds a feature
* **perf**: A code change that improves performance
* **test**: Adding missing or correcting existing tests
* **chore**: Changes to the build process or auxiliary tools and libraries such as documentation
  generation

### Scope
The scope could be anything specifying place of the commit change. For example folder.file, Class, stores, ammunations, labels, characters, etc...

You can use `*` when the change affects more than a single scope.

### Subject
The subject contains succinct description of the change:

* use the imperative, present tense: "change" not "changed" nor "changes"
* don't capitalize first letter
* no dot (.) at the end

### Body
Just as in the **subject**, use the imperative, present tense: "change" not "changed" nor "changes".
The body should include the motivation for the change and contrast this with previous behavior.

### Footer
The footer should contain any information about **Breaking Changes** and is also the place to
[reference GitHub issues that this commit closes](https://help.github.com/articles/closing-issues-via-commit-messages/).

**Breaking Changes** should start with the word `BREAKING CHANGE:` with a space or two newlines.
The rest of the commit message is then used for this.