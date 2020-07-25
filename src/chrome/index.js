/**
 * 浏览器相关操作
 * @param {*} chromeFlags 
 */
const chromeLauncher = require('chrome-launcher')
const chalk = require('chalk')

/**
 * 启动 Chrome
 * @param {*} chromeFlags 
 */
const launchChrome = async (chromeFlags) => {
  return await chromeLauncher.launch({chromeFlags: chromeFlags})
}
/**
 * 关闭 Chrome
 * @param {*} chrome 
 */
const closeChrome = async (chrome) => {
  chrome.kill().then(() => console.log(chalk.green('Close Chrome success~')));
}


module.exports = {
  launchChrome,
  closeChrome
}