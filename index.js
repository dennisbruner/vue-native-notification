// Notification object
var Notification = window.Notification || window.webkitNotification

const onerror = function onerror (event) {
  // console.log('On error event was called')
}

const onclick = function onclick (event) {
  // console.log('On click event was called')
  event.preventDefault()
  window.focus()
  event.target.close()
}

const onclose = function onclose (event) {
  // console.log('On close event was called')
}

const onshow = function onshow (event) {
  // console.log('On show event was called')
}

const defaultEvents = {
  onerror: onerror,
  onclick: onclick,
  onclose: onclose,
  onshow: onshow
}

// Plugin
const VueNativeNotification = {
  install: function (Vue, options) {
    options = options || {}
    options.requestOnNotify = options.requestOnNotify || true

    Vue.notification = {}
    Vue.prototype.$notification = {}

    // Manual permission request
    var requestPermission = function () {
      return Notification.requestPermission()
    }
    Vue.notification.requestPermission = requestPermission
    Vue.prototype.$notification.requestPermission = requestPermission

    // Show function
    var show = function (title, opts, {
            onerror = function () { },
      onclick = function () { },
      onclose = function () { },
      onshow = function () { }
        }) {
      return Promise.resolve()
        .then(function () {
          if (options.requestOnNotify && Notification.permission !== 'granted') {
            return requestPermission()
          }

          return Notification.permission
        })
        .then(function (permission) {
          // "default" doesn't mean "denied"
          // It means the user has dismissed the request
          if (permission === 'denied') {
            return new Error('No permission to show notification')
          }

          // Create Notification object
          const notification = new Notification(title, opts)

          const bindOnError = function (event) {
            'use strict'
            defaultEvents.onerror(event)
            onerror()
          }

          const bindOnClick = function (event) {
            'use strict'
            defaultEvents.onclick(event)
            onclick()
          }

          const bindOnClose = function (event) {
            'use strict'
            defaultEvents.onclose(event)
            onclose()
          }

          const bindOnShow = function (event) {
            'use strict'
            defaultEvents.onshow(event)
            onshow()
          }

          notification.onerror = bindOnError
          notification.onclick = bindOnClick
          notification.onclose = bindOnClose
          notification.onshow = bindOnShow

          return notification
        })
    }
    Vue.notification.show = show
    Vue.prototype.$notification.show = show
  }
}

// Automatic installation
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(VueNativeNotification)
}

// Export plugin
export default VueNativeNotification
