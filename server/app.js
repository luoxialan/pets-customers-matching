
const koa = require('koa');
const bodyParser = require('koa-bodyparser');
const router = require('./router');
const config = require('./config');
// const logger = require('koa-logger')

const app = new koa();

app.use(bodyParser());
app.use(router.middleware());

/*
app.use(async (ctx, next) => {
    try {
        await next();
    } catch (err) {
        ctx.status = err.status || 500;
        ctx.body = err.message;
        ctx.app.emit('error', err, ctx);
    }
});
*/

app.listen(config.PORT);

console.log('Hi! Server running on port 3000 now!');