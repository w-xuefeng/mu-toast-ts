
import { Toast as ToastLite } from '@/toast-lite/Toast.vue'
import Toast from '@/toast';
declare module 'vue/types/vue' {
  interface Vue {
    $muToast: typeof Toast;
    $muLToast: typeof ToastLite;
  }
}
