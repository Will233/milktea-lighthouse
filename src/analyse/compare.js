const fs = require('fs')
const { launchChrome, closeChrome } = require('../chrome/index')
const { runLighthouse } = require('../core/run')
const config = require('../../lighthouse.config')

/**
 * 运行测试过程
 * @param {*} config 
 */
const run = async ({ url, reportName }) => {
  const { lighthouse, browser} = config
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
  // const site = url.split('://')[1].replace(/\//g, '__')
  // const filename = `${reportName || site}__${Date.now()}.json`
  // await generateReport(filename, res)
  await closeChrome(chrome)
  return res
}

// const updateSeries = ({
//   groupType,
//   seriesType,
//   point
// }) => {

// }

/**
 * 搜集测试过程进行性能对比
 * 
 */

const compare = async (options) => {
  const { analyse } = options || config
  const { count, watchAudits, sites } = analyse

  // {
  //   name: AUDIT_TYPES[audit]+'(优化组)',//'EXPE-' + audit,
  //   type: 'line',
  //   groupType: DATA_GROUP.EXPERIMENT,
  //   seriesType: audit,
  //   data: []
  // }
  // 
  const originRecords = []
  const experimentRecords = []

  let curr = 0
  const [ originSite, experimentSite ] = sites
  // 记录数据结果：series = {'dom-ready': [], ... }

  const series1 = {}
  const series2 = {}
  while(curr < count) {
    let res1, res2;
    // 交替运行，减少误差
    if (curr % 2 === 0) {
      res1 = await run({url: originSite.url})
      res2 = await run({url: experimentSite.url})
      // 记录到数据中
    } else {
      res2 = await run({url: experimentSite.url})
      res1 = await run({url: originSite.url})
    }
    // 解析audits 结果，并上报比较

    watchAudits.forEach(audit => {
      if (Array.isArray(series1[audit])) {
        series1[audit].push(res1.audits[audit].numericValue)
      } else {
        series1[audit] = [res1.audits[audit].numericValue]
      }
      if (Array.isArray(series2[audit])) {
        series2[audit].push(res2.audits[audit].numericValue)
      } else {
        series2[audit] = [res2.audits[audit].numericValue]
      }
    })
    curr++
  }
  // console.log(series1)
  // return [series1, series2]
  setEcharts(analyse, [series1, series2])
}

const setEcharts = (analyseConfig, series) => {
  // init echarts
  const { count, watchAudits} = analyseConfig
  const echartsData = {
    legend: {
      data:[]
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: []
    },
    series: [],
  }
  for (let index = 0; index < count; index++) {
    echartsData.xAxis.data.push(`第${index+1}次`)
  }

  watchAudits.forEach(audit => {
    echartsData.series.push({
      name: `${audit}(对照组)`,
      type: 'line',
      groupType: '对照组',
      seriesType: audit,
      data: series[0][audit]
    })
    echartsData.legend.data.push(`${audit}(对照组)`)

    echartsData.series.push({
      name: `${audit}(优化组)`,
      type: 'line',
      groupType: '优化组',
      seriesType: audit,
      data: series[1][audit]
    })
    echartsData.legend.data.push(`${audit}(优化组)`)

  })
  // const res = {
  //   legend: echartsData.legends,
  //   series: echartsData.series,
  //   aAxis: {
  //     type: 'category',
  //     boundaryGap: false,
  //     data: echartsData.axis
  //   }
  // }
  // write into file
  fs.writeFileSync('__reports__/series.js',
    `window.reportData = ${JSON.stringify(echartsData)}`
  )
  // return echartsData
}

module.exports = {
  compare
}