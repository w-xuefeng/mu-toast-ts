import config from './config';
import Message from './message.vue'
import { ToastOptions } from './type'

const isServer = typeof window === 'undefined';
let message: { $el: Element; message: Function; close: Function };

export function openMessage(options: ToastOptions) {
  if (isServer) return;
  if (!message) {
    message = new Message({
      el: document.createElement('div')
    });
    document.body.appendChild(message.$el);
  }
  return message.message(options);
}

export function closeMessage(id?: string) {
  if (!message) return;
  message.close(id);
}

export function getMessage() {
  return message;
}

class ToastBase {
  static config(options?: ToastOptions) {
    if (!options || Array.isArray(options) || typeof options !== 'object')
      return config;
    for (const key in options) {
      if (!Object.prototype.hasOwnProperty.call(options, key)) continue;
      config[key] = options[key];
    }
    return config;
  }
  static message(options: ToastOptions | string) {
    if (!options) return;
    options = typeof options === 'string' ? { message: options } : options;
    const opt: ToastOptions = {
      time: config.time,
      position: config.position,
      close: config.close,
      ...options
    };
    const id = openMessage(opt);
    if (opt.time && opt.time > 0) {
      setTimeout(() => closeMessage(id), opt.time);
    }

    return id;
  }
  static close(id: string) {
    closeMessage(id);
  }
}

class Toast extends ToastBase {
  static install(Vue: Vue.VueConstructor, options?: ToastOptions) {
    Toast.config(options)
    Object.defineProperty(Vue.prototype, '$muToast', {
      value: Toast,
    })
  }
  static getTypeOptions(type: string, options: ToastOptions | string) {
    return typeof options === 'string'
      ? {
          message: options,
          color: type,
          icon: config[type + 'Icon'],
        }
      : {
          ...options,
          color: type,
          icon: config[type + 'Icon'],
        }
  }
  static success(options: ToastOptions | string) {
    if (!options) return
    options = Toast.getTypeOptions('success', options)
    return Toast.message(options)
  }
  static error(options: ToastOptions | string) {
    if (!options) return
    options = Toast.getTypeOptions('error', options)
    return Toast.message(options)
  }
  static info(options: ToastOptions | string) {
    if (!options) return
    options = Toast.getTypeOptions('info', options)
    return Toast.message(options)
  }
  static warning(options: ToastOptions | string) {
    if (!options) return
    options = Toast.getTypeOptions('warning', options)
    return Toast.message(options)
  }
}

export default Toast;
