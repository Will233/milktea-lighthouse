/**
 * @license Copyright 2018 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
 */
'use strict';

const CHROME_PATH = '/Applications/Google Chrome.app/Contents/MacOS/Google\ Chrome'

/** @type {LH.Config.Json} */
const lighthouse = {
  // 1. Run your custom tests along with all the default Lighthouse tests.
  extends: 'lighthouse:default',
  settings: {
  //   maxWaitForFcp: 15 * 1000,
  //   maxWaitForLoad: 35 * 1000,
    onlyCategories: ['mysite'],
    onlyAudits: [
      // 'first-meaningful-paint',
      // 'speed-index',
      // 'first-cpu-idle',
      './src/core/audits/dom-ready',
      './src/core/audits/dom-complete'
    ],
    // Skip the h2 audit so it doesn't lie to us. See https://github.com/GoogleChrome/lighthouse/issues/6539
    // skipAudits: ['uses-http2'],
  },
  // 2. Add gatherer to the default Lighthouse load ('pass') of the page.
  passes: [{
    passName: 'defaultPass',
    gatherers: [
      './src/core/gatherers',
    ],
  }],
  // 3. Add custom audit to the list of audits 'lighthouse:default' will run.
  audits: [
    './src/core/audits/dom-ready',
    './src/core/audits/dom-complete'
  ],
  // audits: [
  //   'metrics/first-contentful-paint-3g',
  // ],
  // 4. Create a new 'My site metrics' section in the default report for our results.
  categories: {
    mysite: {
      title: 'My site metrics',
      description: 'Metrics for our super awesome site',
      auditRefs: [
        // When we add more custom audits, `weight` controls how they're averaged together.
        {id: 'dom-ready', weight: 1},
        {id: 'dom-complete', weight: 1},
      ],
    },
  },
  // @ts-ignore TODO(bckenny): type extended Config where e.g. category.title isn't required
  // categories: {
  //   performance: {
  //     auditRefs: [
  //       {id: 'first-contentful-paint-3g', weight: 0},
  //     ],
  //   },
  // },
  // plugins: ['lighthouse-plugin-field-performance'],
  // settings: {
  //   psiToken: 'YOUR_REAL_TOKEN'
  // }
};
const browser = {
  chromeFlags: ['--headless'],
  headless: true,
  executablePath: CHROME_PATH,
  device: '',
  defaultViewport: {
    width: 375,
    height: 667,
    deviceScaleFactor: 2,
    isMobile: true,
    hasTouch: true
  }
};

const analyse = {
  count: 1,
  watchAudits: [
    'dom-ready',
    'dom-complete'
  ],
  sites: [{
    url: 'https://cn.bing.com',
    type: 'ORIGIN',
    label: '对照组'
  }, {
    url: 'https://cn.bing.com',
    type: 'EXPERIMENT',
    label: '优化组'
  }]
}

const report = {
  dir: './__reports__'
}

module.exports = {
  lighthouse,
  browser,
  analyse,
  report,
};