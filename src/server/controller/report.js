
const { compare } = require('../../analyse/compare')
const report = async ctx => {
  const options = ctx.request.body
  const defaultConfig = {
    count: 1,
    watchAudits: [
      'performance-audit'
    ],
    sites: [{
      url: 'https://cn.bing.com/',
      type: 'ORIGIN',
      label: '对照组'
    }, {
      url: 'https://cn.bing.com/',
      type: 'EXPERIMENT',
      label: '优化组'
    }]
  }
  const config = Object.assign(defaultConfig, options)
  await compare({
    analyse: config
  })

  ctx.status = 200
  ctx.body = {
    code: 100,
    data: {},
    message: 'success'
  }
}
module.exports = {
  report
}