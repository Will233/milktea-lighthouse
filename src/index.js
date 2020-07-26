/**
 * 基于 lighthouse 的性能测试工具
 */

const { start } = require('./core/run')

start({
  url: 'https://cn.bing.com/',
  reportName: 'bing'
})