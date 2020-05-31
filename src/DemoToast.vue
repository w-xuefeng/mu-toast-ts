<template>
  <div class="demo-text">
    <h6>Toast: 将原 Toast 组件使用 typescript 改写后的全局消息提示组件</h6>
    <h6>已知问题： toast 出现的时候会有丢失动画的问题</h6>
    <h6>
      <a target="view_window" rel="noopener noreferrer" href="https://github.com/museui/muse-ui-toast">
        原作组件地址: muse-ui-toast
      </a>
    </h6>
    <div class="test">
      <mu-button
        class="demo-button"
        @click="$muToast.message('Hello World')"
        color="primary"
        >message</mu-button
      >
      <mu-button
        class="demo-button"
        @click="$muToast.success('Hello World')"
        color="success"
        >success</mu-button
      >
      <mu-button
        class="demo-button"
        @click="$muToast.warning('Hello World')"
        color="warning"
        >warning</mu-button
      >
      <mu-button
        class="demo-button"
        @click="$muToast.info('Hello World')"
        color="info"
        >info</mu-button
      >
      <mu-button
        class="demo-button"
        @click="$muToast.error('Hello World')"
        color="error"
        >error</mu-button
      >
    </div>
    <mu-divider class="divider"></mu-divider>
    <div class="test-normal">
      <mu-row>
        <mu-col
          class="demo-toast-radio"
          :key="p"
          v-for="p in positions"
          span="6"
          md="3"
        >
          <mu-radio
            v-model="normal.position"
            :value="p"
            :label="p"
          ></mu-radio>
        </mu-col>
      </mu-row>
      <mu-flex wrap="wrap">
        <mu-text-field
          v-model="normal.message"
          label="Message"
          label-float
        ></mu-text-field>
        <mu-text-field
          v-model.number="normal.time"
          label="Timeout"
          type="number"
          label-float
        ></mu-text-field>
      </mu-flex>
      <mu-button
        full-width
        color="primary"
        @click="$muToast.message(normal)"
      >
        show Toast
      </mu-button>
    </div>
    <mu-divider class="divider"></mu-divider>
    <div class="test-color">
      <mu-row>
        <mu-col
          class="demo-toast-radio"
          :key="c"
          v-for="c in colors"
          span="6"
          md="3"
        >
          <mu-radio
            v-model="color.color"
            :color="color.color"
            :value="c"
            :label="c"
          ></mu-radio>
        </mu-col>
      </mu-row>
      <mu-flex wrap="wrap">
        <mu-text-field
          v-model="color.message"
          label="Message"
          label-float
        ></mu-text-field>
        <mu-text-field
          v-model.number="color.time"
          label="Timeout"
          type="number"
          label-float
        ></mu-text-field>
      </mu-flex>
      <mu-button
        full-width
        color="primary"
        @click="$muToast.message({ ...color, icon })"
      >
        show Toast
      </mu-button>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { ToastItem } from '@/toast/type'

@Component
export default class Test extends Vue {
  positions = [
    'top-start',
    'top',
    'top-end',
    'bottom-start',
    'bottom',
    'bottom-end',
  ]
  colors = ['success', 'info', 'error', 'warning']
  color: ToastItem = {
    color: 'success',
    message: 'Hello World, Toast !',
    open: false,
    time: 3000,
    timeout: 3000,
    closeIcon: 'close',
  }
  normal: ToastItem = {
    position: 'bottom',
    message: 'Hello World, Toast !',
    open: false,
    time: 3000,
    timeout: 3000,
    closeIcon: 'close',
  }

  get icon() {
    const colors = {
      success: 'check_circle',
      info: 'info',
      warning: 'priority_high',
      error: 'warning',
    }
    const color = (this.color.color || 'info') as keyof typeof colors
    return colors[color]
  }
}
</script>
<style scoped>
.demo-text {
  padding: 5% 2%;
}
.demo-text h6 {
  width: 90%;
  text-align: center;
  margin: 10px auto;
}
.test {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
.demo-button {
  margin: 6px 8px;
}
.demo-toast-radio {
  margin: 8px 0;
}
.test-normal,
.test-color {
  width: 80%;
  padding: 5px;
  max-width: 600px;  
  margin: 0 auto;
}
.divider {  
  margin: 50px auto;
  width: 100%;
}
</style>
