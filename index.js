// Notification object
var Notification = window.Notification || window.webkitNotification

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
    var show = function (title, opts) {
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
          return new Notification(title, opts)
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
