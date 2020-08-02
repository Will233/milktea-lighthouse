/**
 * 基于 lighthouse 的性能测试工具
 */
const program = require('commander')
const path = require('path')
const appInfo = require('../package.json')
const { start } = require('../src/core/run')
const { compare } = require('../src/analyse/compare')
const { createServer } = require('../src/server/app')

const ROOT_PATH = process.cwd();

program.version(appInfo.version)
program
  .command('run <url>')
  .description('输入需要测试的链接')
  .option('-l, --label <site>')
  .action(function(url, options) {
    const name = options.site || 'web-site'
    start({url: url, reportName: name})
  })

program
  .command('compare')
  .description('输入需要测试的链接')
  .option('-l, --label <site>')
  .action(function(url, options) {
    // const name = options.site || 'web-site'
    // start({url: url, reportName: name})
    compare()
  })

program
  .command('ui')
  .description('打开 ui 交互页面')
  .option('-p, --port <port>')
  .action(function(option) {
    const port = option.port
    const publicRoot = path.resolve(ROOT_PATH, 'src/view')
    console.log(publicRoot)
    try {
      createServer()
    } catch(e) {
      console.error(e)
    }
  })

program.parse(process.argv)