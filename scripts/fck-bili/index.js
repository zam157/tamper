// ==UserScript==
// @name         霹雳霹雳去广告 + 去hover弹幕弹窗
// @license MIT
// @namespace    zam157.pilifukker
// @version      0.5
// @description  Fuck pilipili
// @author       Zam157
// @run-at       document-start
// @match        https://www.bilibili.com/video/*
// @match        https://www.bilibili.com/bangumi/play/*
// @icon         https://static.hdslb.com/images/favicon.ico
// @grant        GM_addStyle
// ==/UserScript==

(function () {
  'use strict'

  const css = `
    .bilibili-player-electric-panel,
    .bilibili-player-ending-panel,
    .video-page-special-card,
    .activity-m,
    .bilibili-player-dm-tip-wrap,
    .bpx-player-electric-wrap,
    .bpx-player-cmd-dm-inside,
    .vcd,
    #bannerAd,
    #right-bottom-banner,
    #activity_vote,
    #live_recommand_report {
      display: none!important;
    }

    .bili-header__bar.mini-header,
    .reply-box.fixed-box,
    .comment-send-lite {
      backdrop-filter: saturate(50%) blur(8px)!important;
      background: none!important;
    }
  `
  GM_addStyle(css)

  // 改写addEventListener，禁止目标元素的mousemove事件
  const originalAEL = EventTarget.prototype.addEventListener
  EventTarget.prototype.addEventListener = function (...arg) {
    if (arg?.[0] === 'mousemove' && arg[1]?.name === '' && this?.className?.includes?.('bpx-player-video-area'))
      return

    originalAEL.apply(this, arg)
  }
})()
