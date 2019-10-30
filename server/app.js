
const koa = require('koa');
const bodyParser = require('koa-bodyparser');
const router = require('./router');
const config = require('./config');
// const logger = require('koa-logger')

const app = new koa();

app.use(bodyParser());
app.use(router.middleware());

app.listen(config.PORT);

console.log('Hi! Server running on port 3000 now!');