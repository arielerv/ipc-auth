# IPC-AUTH

IPC-AUTH is made with Node and express.
It is a gateway to connect the mobile app with the IPC backend,
and exposes only endpoints for a user's synchronization and section.

### Table of Contents

1. [Install](#install)
1. [Project structure](#project-structure)
1. [Tech stack](#tech-stack)
1. [Testing](#testing)
1. [Actions Naming](#actions)
1. [Code Review](#code-review)
1. [Commits](#commit-messages)

## Install

After clone this project you should install the npm packages and bower packages.

    npm install

To run the app you should use this command.

    npm run dev

### Project structure

The structure used is vertical, divided by components.
These are the most important folders that you'll need to familiarise:

```
src/ -> root directory
 components/ -> A component is an entity that contains its handlers, services, routes, etc.
  docs/ -> Swagger documentation.
 constants/ -> Constants, enums, etc.
 helpers/ -> Everything necessary to make it work.
 middlewares/ -> catch errors, config swagger, etc.
 types/ -> All generic types
 utils/ -> General utilitarian functions.
```

### Tech stack

These are the core dependencies you'll need to familiarise yourself with:

- [Node](https://nodejs.org/docs/latest/api/)
- [Express](https://expressjs.com/)
- [Swagger](https://swagger.io/docs/)
- [Mongoose](https://mongoosejs.com/docs/)
- [Mocha](https://mochajs.org/)

### Testing

Run tests:

```sh
npm run test
npm run test:ci
```

Lint the code with [ESLint](https://eslint.org):

```sh
npm run lint
npm run lint:fix
```

### Code review

Create a pull request for any changes in the following format:

```md
# Overview

Basic overview of the changes made.

## Changes

- A more detailed list
- Of things that have changed

## How to test

1. List instructions for how to test
2. Make sure it's detailed and includes the exact steps
```

## Contribution guidelines

### Git guidelines

The repository has three primary branches:

1. `master` (production)
2. `qa` (qa)
3. `develop` (development)

When you work, create one of the following branches:

#### `feat/...`

Created from `develop`, to be merged back into `develop`.

#### `fix/...`

Created from `develop`, to be merged back into `develop`.

#### `hotfix/...`

Created from `master`, to be merged back into `master` and `develop`.

### commit messages

The commit message should has the following format:

```
<type>(<scope>): <subject>

<body>

<footer>
```

Example:

```
fix(middleware): ensure Range headers adhere more closely to RFC 2616

Add one new dependency, use `range-parser` (Express dependency) to compute
range. It is more well-tested in the wild.

Fixes #2310
```
