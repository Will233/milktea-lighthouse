const Koa = require('koa')
const koaStatic = require('koa-static-server')
const bodyParser = require('koa-body-parser')
const path = require('path')
const router = require('./router.js')
const ROOT_PATH = process.cwd();
// 注册全局变量

global.SERVER_ROOT = path.resolve(ROOT_PATH, 'src/server')
global.DATA_ROOT = path.resolve(ROOT_PATH, 'src/data')
global.STATIC_PATH = path.resolve(ROOT_PATH, 'src/server/view')

// console.log(STATIC_PATH)
const createServer = () => {
  const app = new Koa()
  app.use(bodyParser())
  // 静态目录
  app.use(koaStatic({
    rootDir: 'src/server/view',
    // rootPath: '',
    log: true}));
  app.use(router.routes()).use(router.allowedMethods());
  app.on('error', (err, ctx) => {
    console.error('server error', err, ctx)
  });
  app.listen(3000)
}

module.exports = {
  createServer
}
