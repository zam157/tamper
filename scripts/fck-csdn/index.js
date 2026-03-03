// ==UserScript==
// @name        去nm的CSDN
// @description CSDN纯享版
// @license     MIT
// @namespace   zam157.csdnfucker
// @match       https://blog.csdn.net/*
// @grant       GM_addStyle
// @run-at      document-start
// @version     0.0.4
// @author      Zam157
// @homepageURL  https://github.com/zam157/tamper/tree/master/scripts/fck-csdn
// @supportURL   https://github.com/zam157/tamper/tree/master/scripts/fck-csdn
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
.hide-article-box,
.sidecolumn-deepseek,
.rightside-fixed-hide,
.runner-box,
.recommend-right,
.opt-box,
#creatActivityHref,
main div.blog-content-box pre.new-version button.btn-code-notes,
main div.blog-content-box pre.new-version div.hljs-button,
.sidecolumn-vip,
a[data-type="app"],
a[data-type="cs"],
#blogHuaweiyunAdvert,
#blogColumnPayAdvert,
#toolbarBox {
  display: none!important;
}
.nodata .container main {
  width: 100%;
}
.article_content {
  height: auto!important;
}
.d-flex.kind_person {
  display: none!important;
}
.container {
  margin-right: 0!important;
}
main div.blog-content-box pre.new-version {
  padding-top: 0!important;
}
main div.blog-content-box pre.new-version.prettyprint .pre-numbering {
  top: 0!important;
}
`
  GM_addStyle(styles)

  // 改写addEventListener，禁止注册copy事件
  const originalAEL = EventTarget.prototype.addEventListener
  EventTarget.prototype.addEventListener = function (...aelArgs) {
    // #region 禁止禁止复制
    if (aelArgs[0] === 'copy') {
      return
    }
    // #endregion

    // #region 禁止点击中转
    if (aelArgs[0] === 'click' && this.id === 'content_views') {
      function injectFn(...listenerArgs) {
        const e = listenerArgs[0]
        if (e.target.tagName === 'A')
          return
        aelArgs[1].apply(this, listenerArgs)
      }
      originalAEL.apply(this, [aelArgs[0], injectFn, aelArgs[2]])
      return
    }
    // #endregion

    originalAEL.apply(this, aelArgs)
  }
})()
