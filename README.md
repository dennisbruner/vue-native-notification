# vue-native-notification

Vue.js plugin for native notifications

## Install

```
npm install --save vue-native-notification
```

## Usage

### Add plugin

```javascript
import Vue from 'vue'
import VueNativeNotification from 'vue-native-notification'

Vue.use(VueNativeNotification, {
  // Automatic permission request before
  // showing notification (default: true)
  requestOnNotify: true
})
```

### Show notification

```html
<template>
  <button type="button" @click="notify">Show notification</button>
</template>

<script>
export default {
  methods: {
    notify () {
      // https://developer.mozilla.org/en-US/docs/Web/API/Notification/Notification#Parameters
      this.$notification.show('Hello World', {
        body: 'This is an example!'
      })
    }
  }
}
</script>

<style>
</style>
```

### Manual permission request

You can manually request users permission with:

```javascript
// Global
Vue.notification.requestPermission()
  .then(console.log) // Prints "granted", "denied" or "default"

// Component
this.$notification.requestPermission()
  .then(console.log)
```

## License

[MIT](LICENSE.md)
