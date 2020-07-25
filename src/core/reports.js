const fs = require('fs')
const path = require('path')
const ROOT_PATH = process.cwd();

const { report } = require('../../lighthouse.config');
const { rejects } = require('assert');
const { resolve } = require('path');

const generateReport = async (filename, data) => {
  const reportFile = path.resolve(ROOT_PATH, report.dir) + '/' + filename 
  console.log(reportFile)
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