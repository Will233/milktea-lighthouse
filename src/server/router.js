const Route = require('koa-router')
const router = new Route()
// 引入不同的controller
const configController = require('./controller/config')
const reportController = require('./controller/report')

router.post('/app/config/post', configController.setAppConfig)
router.post('/app/config/query', configController.getAppConfig)

router.post('/app/run/report', reportController.report)
module.exports = router