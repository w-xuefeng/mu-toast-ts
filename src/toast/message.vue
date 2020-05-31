<script lang="tsx">
import { Component, Vue } from 'vue-property-decorator';
import config from './config';
import { ToastOptions, ToastItem, VNode } from './type';

let index = 20200420;

@Component({ name: 'toast-message' })
export default class Message extends Vue {
  messages: ToastItem[] = [];
  createAction(
    action: string | VNode,
    actionClick: Function,
    item: ToastItem,
    isIcon = false
  ) {
    return (
      <mu-button
        icon={isIcon}
        flat={!isIcon}
        color={item.color ? '#fff' : 'secondary'}
        style={isIcon ? { width: '36px', height: '36px' } : {}}
        slot='action'
        onclick={() => actionClick && actionClick(item.id)}
      >
        {action}
      </mu-button>
    );
  }
  public message(options: ToastOptions) {
    const id = 'toast_id_' + index++;
    this.messages.push({
      ...options,
      id,
      open: true
    });
    return id;
  }
  public close(id?: string) {
    if (!id) return;
    const item = this.messages.filter(item => item.id === id)[0];
    if (!item) return;
    item.open = false;

    setTimeout(() => {
      if (!this.messages) return;
      const messageIndex = this.messages.indexOf(item);
      if (messageIndex === -1) return;
      this.messages.splice(messageIndex, 1);
    }, 500);
  }
  getCloseBtn(item: ToastItem) {
    const action = (
      <mu-icon value={item.closeIcon || config.closeIcon} style={{ 'margin-right': 0 }} />
    );
    const actionClick = (id: string) => this.close(id);
    return item.close
      ? this.createAction(action, actionClick, item, true)
      : undefined;
  }
  render() {
    const snackbar = (item: ToastItem) => (
      (
        <mu-snackbar
          color={item.color}
          textColor={item.textColor}
          open={item.open}
          position={item.position}
          key={item.id}
          {...{ on: { 'update:open': (rs: boolean) => { item.open = rs } }} }
        >
          {item.icon ? <mu-icon left={true} value={item.icon} /> : ''}
          {item.actions && item.actions.length > 0
            ? item.actions.map(({ action, click }) =>
                this.createAction(action, click, item)
              )
            : ''}
          {item.message}
          {this.getCloseBtn(item)}
        </mu-snackbar>
      )
    )
    return <div>{ this.messages.map(snackbar) }</div>
  }
}
</script>
