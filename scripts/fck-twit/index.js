// ==UserScript==
// @name         Fck Twitter
// @license MIT
// @namespace    zam157.fck-twit
// @version      0.1
// @run-at       document-start
// @description  F**k twitter!
// @author       Zam157
// @description 2023/4/30 04:56:15
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
      if (args[1].includes('HomeLatestTimeline')) {
        injectXHRResponse(thisArg, 'response')
        injectXHRResponse(thisArg, 'responseText')
      }

      return target.apply(thisArg, args)
    },
  })
})()
