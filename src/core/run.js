/**
 * 运行模块
 */

const lighthouse = require('lighthouse');
const { launchChrome, closeChrome } = require('../chrome/index')
const config = require('../../lighthouse.config')
const { generateReport } = require('./reports')
const chalk = require('chalk')
const fs = require('fs')

/**
 * 运行lighthouse, 获取测量结果
 * @param {*} option
 * @return performance result 
 */
const runLighthouse = async ({
  chrome,
  url,
  browser,
  config
}) => {
  console.log(config.passes)
  if (!chrome) return
  browser.port = chrome.port;
  console.log(chalk.yellow(JSON.stringify(config)))
  const result = await lighthouse(url, browser, config).then(result => result.lhr)
  return result
}

/**
 * 运行测试过程
 * @param {*} config 
 */
const start = async ({ url, reportName }) => {
  const { lighthouse, browser, audit} = config
  // let { runTimes, watchAudits } = audit
  let chrome = await launchChrome(browser.chromeFlags, browser, lighthouse)
  // chrome,
  // url,
  // browser,
  // config
  const res = await runLighthouse({
    chrome,
    url,
    browser,
    config: lighthouse,
  })
  // console.log(chalk.green(JSON.stringify(res)))
  const site = url.split('://')[1].replace(/\//g, '__')
  const filename = `${reportName || site}__${Date.now()}.json`
  await generateReport(filename, res)
  await closeChrome(chrome)
}
module.exports = {
  runLighthouse,
  start
}