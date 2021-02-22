/**
 * Extends interfaces in Vue.js
 */

import Vue from 'types/vue'
import { Notification } from 'vue-native-notification'

declare module 'vue/types/options' {
  interface ComponentOptions<V extends Vue> {
    notifications?: Notification;
  }
}

declare module 'vue/types/vue' {
  interface Vue {
    $notification: Notification;
  }
}
