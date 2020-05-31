import { VNode } from "vue";
export { VNode };
export type ToastPosition = 'top' | 'top-start' | 'top-end' | 'bottom' | 'bottom-start' | 'bottom-end'
export type ToastAction = { action: string | VNode; click: (id: string) => any}
export interface ToastOptions {
  message?: string;
  time?: number;
  position?: ToastPosition;
  close?: boolean;
  icon?: string;
  actions?: Array<ToastAction>;
  color?: string;
  textColor?: string;
  closeIcon?: string;
  successIcon?: string;
  infoIcon?: string;
  warningIcon?: string;
  errorIcon?: string;
  [any: string]: any;
}

export interface ToastItem extends ToastOptions {
  id?: string;
  open?: boolean;
}
