// ==UserScript==
// @name         Fck Twitter
// @license      MIT
// @namespace    zam157.fck-twit
// @version      0.1.1
// @run-at       document-start
// @description  F**k twitter!
// @author       Zam157
// @homepageURL  https://github.com/zam157/tamper/tree/master/scripts/fck-twit
// @supportURL   https://github.com/zam157/tamper/tree/master/scripts/fck-twit
// @match        https://twitter.com/**
// ==/UserScript==

(() => {
  function injectXHRResponse(thisArg, prop = 'response') {
    const getter = Object.getOwnPropertyDescriptor(XMLHttpRequest.prototype, prop).get
    Object.defineProperty(thisArg, prop, {
      get: () => {
        const result = getter.call(thisArg)
        if (!result)
          return

        const json = JSON.parse(result)
        const instructions = json.data.home.home_timeline_urt.instructions

        const _instructions = instructions.map((instruction) => {
          if (instruction.type !== 'TimelineAddEntries')
            return instruction

          instruction.entries = instruction.entries.filter(entry => !entry.entryId.includes('promoted-tweet'))
          return instruction
        })

        json.data.home.home_timeline_urt.instructions = _instructions
        const _result = JSON.stringify(json)
        return _result
      },
    })
  }

  XMLHttpRequest.prototype.open = new Proxy(XMLHttpRequest.prototype.open, {
    apply(target, thisArg, args) {
      if (/HomeTimeline|HomeLatestTimeline/.test(args[1])) {
        injectXHRResponse(thisArg, 'response')
        injectXHRResponse(thisArg, 'responseText')
      }

      return target.apply(thisArg, args)
    },
  })
})()
