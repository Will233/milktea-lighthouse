/**
 * @license Copyright 2017 The Lighthouse Authors. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
 */
'use strict';

const chalk = require('chalk');

const Audit = require('lighthouse').Audit;

const MAX_SEARCHABLE_TIME = 4000;

/**
 * @fileoverview Tests that `window.myLoadMetrics.searchableTime` was below the
 * test threshold value.
 */

class DomCompleteAudit extends Audit {
  static get meta() {
    return {
      id: 'dom-complete',
      title: 'Dom-complete timing',
      failureTitle: 'fail to get performance api',
      description: 'Used to measure load time',

      // The name of the custom gatherer class that provides input to this audit.
      requiredArtifacts: ['PerformanceTime'],
    };
  }

  static audit(artifacts) {
    // 相当于 performance.timing
    const timing = {
      connectEnd: 1595664920879,
      connectStart: 1595664920879,
      domComplete: 1595664921402,
      domContentLoadedEventEnd: 1595664921337,
      domContentLoadedEventStart: 1595664921337,
      domInteractive: 1595664921337,
      domLoading: 1595664920896,
      domainLookupEnd: 1595664920879,
      domainLookupStart: 1595664920879,
      fetchStart: 1595664920879,
      loadEventEnd: 1595664921402,
      loadEventStart: 1595664921402,
      navigationStart: 1595664920878,
      redirectEnd: 0,
      redirectStart: 0,
      requestStart: 1595664920883,
      responseEnd: 1595664920886,
      responseStart: 1595664920884,
      secureConnectionStart: 0,
      unloadEventEnd: 1595664920891,
      unloadEventStart: 1595664920890,
    }
    const performanceTiming = artifacts.PerformanceTime;
    // console.log(performanceTiming)
    // Audit will pass when the search box loaded in less time than our threshold.
    // This score will be binary, so will get a red ✘ or green ✓ in the report.
    // const belowThreshold = performanceTiming.searchableTime <= MAX_SEARCHABLE_TIME;
    // 计算白屏时间
    const domCompleteTime = performanceTiming.loadEventEnd - performanceTiming.navigationStart
    console.log(chalk.green('dom complete:' + domCompleteTime))
    const isRight = domCompleteTime < 3000
    // return {
    //   numericValue: domReadyTime,
    //   // Cast true/false to 1/0
    //   score: Number(isRight),
    // };

    return {
      score: Number(isRight),
      numericValue: domCompleteTime,
      numericUnit: 'millisecond',
    }
  }
}

module.exports = DomCompleteAudit;