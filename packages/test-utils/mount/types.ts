import type { ComponentPublicInstance, Plugin, VNode } from 'vue'
import type { ComponentProps, ComponentSlots } from 'vue-component-type-helpers'

export interface DefaultPlugins {
  plugin: Plugin
  options: Record<string, any>
}

export interface MountResult<T> {
  element: HTMLElement
  component: ComponentPublicInstance
  setupResult: T | undefined
}

export interface MountConfig<P, T = void> {
  props?: ComponentProps<P>
  /** Функция-геттер, возвращающая пропсы. Следует использовать вместо props, если нужна реактивность. */
  propsGetter?: () => ComponentProps<P>
  slots?: Record<keyof ComponentSlots<P>, () => VNode | string>
  /** Корневой элемент, в который будет смонтирован созданный компонент. Если не передан, будет создан пустой <div> */
  element?: HTMLElement
  /** CSS стиль для корневого элемента */
  elementStyle?: Partial<CSSStyleDeclaration>
  plugins?: Plugin[]
  onSetup?: () => T
  testId?: string
}
