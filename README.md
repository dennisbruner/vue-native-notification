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
      }, {})
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

### Events

https://developer.mozilla.org/en-US/docs/Web/API/Notification

We now supports all notifications events

#### onerror

https://developer.mozilla.org/en-US/docs/Web/API/Notification/onerror

Is an empty function. Nothing will be executed

#### onclick

https://developer.mozilla.org/en-US/docs/Web/API/Notification/onclick

When notification is clicked, we set the focus on the context browser and close the notification

#### onclose

https://developer.mozilla.org/en-US/docs/Web/API/Notification/onclose

Is an empty function. Nothing will be executed

#### onshow

https://developer.mozilla.org/en-US/docs/Web/API/Notification/onshow

Is an empty function. Nothing will be executed

#### Usage

```javascript
const notification = {
  title: 'Your title',
  options: {
    body: 'This is an example!'
  },
  events: {
    onerror: function () {
        console.log('Custom error event was called');
    },
    onclick: function () {
        console.log('Custom click event was called');
    },
    onclose: function () {
        console.log('Custom close event was called');
    },
    onshow: function () {
        console.log('Custom show event was called');
    }
  }
}
this.$notification.show(notification.title, notification.options, notification.events)
```

## License

[MIT](LICENSE.md)
