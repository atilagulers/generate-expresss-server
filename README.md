[![Express Logo](https://i.cloudup.com/zfY6lL7eFa-3000x3000.png)](http://expressjs.com/)

[Express](https://www.npmjs.com/package/express) application generator.

## Installation

```sh
$ npm install -g generate-express-server
```

## Quick Start

The quickest way to get started with express is to utilize the executable `express(1)` to generate an application as shown below:

Create the app:

```bash
$ npx express myServer
```

Install dependencies:

```bash
$ npm install
```

Configure .env file:

```bash
MONGO_URI=mongo_uri
JWT_SECRET=secretkey
JWT_LIFETIME=30d
```

More info about JWT ==> [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)

Start your Express.js app at `http://localhost:3000/`:

```bash
$ npm start
```

## License

[MIT](LICENSE)
