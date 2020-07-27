/**
 * 基于 lighthouse 的性能测试工具
 */
const program = require('commander')
const appInfo = require('../package.json')

const { start } = require('../src/core/run')
const { compare } = require('../src/analyse/compare')
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

program.parse(process.argv)
// start({
//   url: 'https://cn.bing.com/',
//   reportName: 'bing'
// })