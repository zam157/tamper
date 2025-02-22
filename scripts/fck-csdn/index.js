// ==UserScript==
// @name        去nm的CSDN
// @description CSDN纯享版
// @license     MIT
// @namespace   zam157.csdnfucker
// @match       https://blog.csdn.net/*
// @grant       GM_addStyle
// @run-at      document-start
// @version     0.0.1
// @author      Zam157
// ==/UserScript==

(function () {
  'use strict'
  const styles = `
    * {
      user-select: auto!important;
    }
    .passport-login-tip-container,
    .article-search-tip,
    .hljs-button,
    .blog_container_aside,
    .more-toolbar,
    .recommend-box,
    .passport-login-container,
    .article-info-box,
    .blog-footer-bottom,
    a[data-type="app"],
    a[data-type="cs"],
    #blogColumnPayAdvert,
    #toolbarBox {
      display: none!important;
    }
    .nodata .container main {
        width: 100%;
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
