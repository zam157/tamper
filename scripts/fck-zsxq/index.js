// ==UserScript==
// @name        Fck 知识星球
// @namespace   zam157.fck-zsxq
// @match       *://*.zsxq.com/*
// @grant        GM_addStyle
// @run-at      document-start
// @version     0.1.0
// @author      Zam157
// @homepageURL  https://github.com/zam157/tamper/tree/master/scripts/fck-zsxq
// @supportURL   https://github.com/zam157/tamper/tree/master/scripts/fck-zsxq
// @description 知识星球去水印、可复制
// ==/UserScript==

(function () {
  'use strict'
  const styles = `
    .topic-container > div,
    .topic-detail-panel {
      background-image: none !important;
    }
    .disabled-copy {
      user-select: auto !important;
    }
  `
  GM_addStyle(styles)

  // 改写addEventListener，禁止注册copy事件
  const originalAEL = EventTarget.prototype.addEventListener
  EventTarget.prototype.addEventListener = function (...arg) {
    if (arg?.[0] === 'copy') {
      // console.log(arg)
      // 成功劫持到目标事件后将addEventListener还原
      // EventTarget.prototype.addEventListener = originalAEL
      return
    }
    originalAEL.apply(this, arg)
  }
})()
