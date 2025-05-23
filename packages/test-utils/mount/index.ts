import { createApp, h, nextTick, computed } from 'vue'
import 'primeicons/primeicons.css'
import '@ag/assets/css/common.css'
import { defaultPlugins } from './default-plugins'
import type { MountConfig, MountResult } from './types'

export const mount = async <P, T = void>(
  type: P,
  config?: MountConfig<P, T>
): Promise<MountResult<T>> => {
  const element = config?.element || document.createElement('div')

  element.className = 'mount-container'

  if (config?.props && config?.propsGetter) {
    throw new Error(
      'Необходимо указать только один из параметров: `config.props` или `config.propsGetter`'
    )
  }

  if (!config?.element) {
    document.body.appendChild(element)
  }

  if (config?.elementStyle) {
    Object.assign(element.style, config.elementStyle)
  }

  const onSetup = config?.onSetup

  let setupResult: T | undefined

  const app = createApp({
    setup: () => {
      if (onSetup) {
        setupResult = onSetup()
      }
    },
    render: () =>
      h(
        type as never,
        computed(() => {
          const props = (config?.props ?? config?.propsGetter) as any
          return typeof props === 'function' ? props() : props
        }).value,
        config?.slots
      ),
  })

  if (!config?.plugins) {
    defaultPlugins.forEach((defaultPlugin) => {
      app.use(defaultPlugin.plugin, defaultPlugin.options)
    })
  } else {
    config.plugins.forEach((plugin) => {
      app.use(plugin)
    })
  }

  const component = app.mount(element)

  await nextTick()

  const componentElement = element.children[0] as HTMLElement

  if (config?.testId) {
    componentElement.setAttribute('data-testid', config.testId)
    await nextTick()
  }

  return {
    element: componentElement,
    component,
    setupResult,
  }
}
