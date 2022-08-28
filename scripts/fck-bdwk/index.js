// ==UserScript==
// @name         Fuck BD Wenku
// @license MIT
// @namespace    zam157.bdwenkufukker
// @version      0.1
// @run-at       document-start
// @description  Fuck Baidu Wenku!
// @author       Zam157
// @match        https://wenku.baidu.com/view/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=baidu.com
// @grant        none
// ==/UserScript==

(function () {
  'use strict'

  const docDatas = new Map()
  window.getDocContent = () => Array.from(docDatas)
    .sort((a, b) => a[0] - b[0])
    .map(item => item[1].body)
    .flat()
    .filter(item => item?.t === 'word')
    .map((item) => {
      if (item?.ps?._enter)
        return `${item.c}\n`
      return item.c
    })
    .join('')

  Array.from({ length: 1000 }).forEach((_, i) => {
    const page = i + 1
    let injectFn
    Object.defineProperty(window, `wenku_${page}`, {
      set(fn) {
        if (fn) {
          injectFn = function (...arg) {
            arg[0] && docDatas.set(page, arg[0])

            return fn(...arg)
          }
        }
        else {
          injectFn = undefined
        }
      },
      get() {
        if (injectFn)
          return injectFn

        return undefined
      },
    })
  })

  // 监听路由变化
  function injectHisory(type) {
    const orig = history[type]
    history[type] = function (...arg) {
      const rv = orig.apply(this, arg)
      const e = new CustomEvent('historyChange', {
        detail: {
          params: arg,
        },
      })
      window.dispatchEvent(e)
      return rv
    }
  }
  ['pushState', 'replaceState', 'go', 'back', 'forward'].forEach(type => injectHisory(type))

  // 路由变化时清空docDatas
  window.addEventListener('popstate', (event) => {
    const e = new CustomEvent('historyChange', {
      detail: { event },
    })
    window.dispatchEvent(e)
  })
  window.addEventListener('historyChange', () => docDatas.clear())

  // 破解VIP功能
  let _pageData
  Object.defineProperty(window, 'pageData', {
    set(newVal) {
      _pageData = newVal
    },
    get() {
      if (_pageData?.vipInfo?.isVip === false)
        _pageData.vipInfo.isVip = 1
      return _pageData
    },
  })
})()
