const fs = require('fs')
const path = require('path')
const ROOT_PATH = process.cwd();

const { report } = require('../../lighthouse.config');

const generateReport = async (filename, data) => {
  const reportFile = path.resolve(ROOT_PATH, report.dir) + '/' + filename
  new Promise((resolve, reject) => {
    fs.writeFile(reportFile, JSON.stringify(data), (err) => {
      if (err) {
        reject(err)
      }
      resolve()
    })
  })
}

module.exports = {
  generateReport
}