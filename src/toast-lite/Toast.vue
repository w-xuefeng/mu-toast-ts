<template>
  <div class="snackbar-toast">
    <mu-snackbar
      :color="setting.color"
      :open.sync="setting.open"
      :position="setting.position"
      :text-color="setting.textColor"
    >
      <mu-icon left :value="icon"></mu-icon>
      {{ setting.message }}
      <mu-button flat slot="action" color="#fff" @click="setting.open = false">
        <mu-icon v-if="setting.closeIcon" :value="setting.closeIcon"></mu-icon>
        {{ setting.closeText }}
      </mu-button>
    </mu-snackbar>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

type config = {
  color?: string;
  message: string;
  closeText?: string;
  closeIcon?: string;
  open?: boolean;
  timeout?: number;
  timer?: number;
  position?:
    | 'top-start'
    | 'top'
    | 'top-end'
    | 'bottom-start'
    | 'bottom'
    | 'bottom-end';
  textColor?: string;
};

@Component({
  name: 'snackbar-toast'
})
export default class ToastCompent extends Vue {
  setting: config = {
    color: 'success',
    message: 'Hello World, Snackbar !',
    closeText: '关闭',
    closeIcon: '',
    open: false,
    timeout: 3000,
    timer: Number.NaN
  };

  get icon(): string {
    const config: Record<string, string> = {
      success: 'check_circle',
      info: 'info',
      warning: 'priority_high',
      error: 'warning'
    };
    return config[this.setting.color || 'success'];
  }
  openColorSnackbar(config: config) {
    this.setting = {
      ...this.setting,
      ...config
    };
    if (this.setting.timer) clearTimeout(this.setting.timer);
    this.setting.open = true;
    this.setting.timer = setTimeout(() => {
      this.setting.open = false;
    }, this.setting.timeout);
  }
}

export class Toast {
  static globalConfig?: config;
  static install(Vue: Vue.VueConstructor, options?: config) {
    Toast.globalConfig = options
    Object.defineProperty(Vue.prototype, '$muLToast', {
      value: Toast,
    })
  }
  static getTypeOptions(type: string, options: config | string): config {
    return typeof options === 'string'
      ? { ...Toast.globalConfig, message: options, color: type }
      : { ...Toast.globalConfig, ...options, color: type };
  }
  static message(type: string, options: config | string) {
    const msg = new ToastCompent({
      el: document.createElement('div')
    });
    document.body.appendChild(msg.$el);
    const config = Toast.getTypeOptions(type, options);
    msg.openColorSnackbar(config);
    setTimeout(() => {
      msg.$destroy()
      document.body.removeChild(msg.$el);
    }, config.timeout || 3000);
  }
  static success(options: config | string) {
    if (!options) return;
    Toast.message('success', options);
  }
  static error(options: config | string) {
    if (!options) return;
    Toast.message('error', options);
  }
  static info(options: config | string) {
    if (!options) return;
    Toast.message('info', options);
  }
  static warning(options: config | string) {
    if (!options) return;
    Toast.message('warning', options);
  }
}
</script>

<style scoped lang="scss"></style>
