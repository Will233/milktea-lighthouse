const fs = require('fs')
const path = require('path')

const setAppConfig = async ctx => {
  const { chromePath } = ctx.request.body
  const appConfigFile = global.DATA_ROOT + '/config.json'
  console.log(chromePath)
  fs.writeFileSync(appConfigFile, JSON.stringify({chromePath}), {encoding: 'utf-8'})

  ctx.status = 200
  ctx.body = {
    code: 100,
    data: {},
    message: 'success'
  }
}

const getAppConfig = async ctx => {
  // 检查是否有浏览器设置文件
  const appConfigFile = global.DATA_ROOT + '/config.json'
  const hasConfigData = fs.existsSync(appConfigFile)
  if (hasConfigData) {
    const file = fs.readFileSync(appConfigFile, {encoding: 'utf-8'})
    ctx.status = 200
    ctx.body = {
      code: 100,
      data: JSON.stringify(file),
      message: 'success'
    }
  } else {
    ctx.status = 200
    ctx.body = {
      code: 0,
      data: {},
      message: 'failure'
    }
  }
}

module.exports = {
  setAppConfig,
  getAppConfig
}