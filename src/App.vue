<template>
  <div class="test-wrap">
    <mu-tabs :value.sync="active" full-width>
      <mu-tab>Toast</mu-tab>
      <mu-tab>ToastLite</mu-tab>
    </mu-tabs>
    <transition name="slide" mode="out-in">
      <DemoToast v-if="active === 0" key="toast" />
      <DemoToastLite v-if="active === 1" key="toast-lite" />
    </transition>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import MuseUI from 'muse-ui'
import { Toast as ToastLite } from '@/toast-lite/Toast.vue'
import Toast from '@/toast/index'
import DemoToast from '@/DemoToast.vue'
import DemoToastLite from '@/DemoToastLite.vue'
import 'muse-ui/dist/muse-ui.css'

Vue.use(MuseUI)
  .use(Toast)
  .use(ToastLite)

@Component({ components: { DemoToast, DemoToastLite } })
export default class Test extends Vue {
  active = 0
  transid = Date.now()

  insertStyle (styleString: string) {
    const head = document.querySelector('head')
    if (!head) return
    const style = document.createElement('style')
    style.type = 'text/css'
    style.id = `over-transition-${this.transid}`
    style.appendChild(document.createTextNode(styleString))
    head.appendChild(style)
  }
  removeStyle () {
    const style = document.querySelector(`style#over-transition-${this.transid}`)
    if (style) style.remove()
  }  
  @Watch('active', { immediate: true })
  onActiveChange(val: number) {
    if (val === 0) {
      this.removeStyle()
    }
    if (val === 1) {
      this.insertStyle(`
        .slide-enter {
          transform: translateX(100%);
        }
        .slide-leave-to {
          transform: translateX(-100%);
        }
      `)
    }
  }
}
</script>
<style lang="less">
.test-wrap {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.slide-enter-active {
  transition: all .4s ease;
}
.slide-leave-active {
  transition: all .5s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-enter {
  transform: translateX(-100%);
  opacity: 0.2;
}
.slide-leave-to {
  transform: translateX(100%);
  opacity: 0.2;
}
</style>
