# SEEOOH API

This is the SEEOOH Application Backend built with [NestJs](https://nestjs.com/)

## Getting Started

Make sure you have nodejs installed by running the following command:

```bash
node -v
```

If the output is not the version of your nodejs installation, install nodejs from [here](https://nodejs.org/en/download/)

After installing nodejs install [yarn](https://www.npmjs.com/package/yarn)
if you have it then install the project's dependencies:

```bash
yarn install
```

## STARTING THE SERVER

To start the application server

```bash
yarn start:dev
```

Open [http://localhost:4500](http://localhost:4500/status) with your browser to see the result.

### **Building**

```bash
yarn build
```

## Editor setup

We're using eslint for js linting, and prettier for code formating, make sure you install eslint and prettier plugins in your editor so you can
see linting errors as you code and have your code formatted on save by prettier. If formatOnSave doesn't work please google how to set up
format on save for the eslint & prettier plugins in your editor 🙃

## Documentation

For detailed information on the endpoint's use, please refer to the [API documentation](http://localhost:4500/docs)

## Contributing

For detailed information on how to go about contributing to this project. Check out the

- [Contribution Guide](docs/CONTRIBUTING.md)

## Testing

You can run the tests by running the following command:

```bash
yarn test # to run all tests - integration and unit

yarn test:e2e # to run end to end tests
```

You can check the test coverage for the codebase by running the following command:

```bash
yarn test:cov # test coverage

```

**Before send PR or making a merge make sure the code is properly linted and formatted.** You can easily do that by running

```bash
yarn lint # to lint all ts files # in project directory

yarn format # to prettify ts files # in project directory
```
