import { createApp, defineComponent, h, type PropType } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import { router } from './router'
import './styles/theme.css'

const ElButton = defineComponent({
  name: 'ElButton',
  props: {
    type: String,
    size: String,
    plain: Boolean,
    link: Boolean,
    color: String,
  },
  setup(props, { slots }) {
    return () => h('button', {
      class: ['el-button', props.type && `el-button--${props.type}`, props.size && `el-button--${props.size}`, {
        'is-plain': props.plain,
        'is-link': props.link,
      }],
      style: props.color ? { '--button-color': props.color } : undefined,
    }, slots.default?.())
  },
})

const ElCard = defineComponent({
  name: 'ElCard',
  props: {
    shadow: String,
  },
  setup(_props, { slots }) {
    return () => h('section', { class: 'el-card' }, slots.default?.())
  },
})

const ElInput = defineComponent({
  name: 'ElInput',
  props: {
    placeholder: String,
    clearable: Boolean,
  },
  setup(props, { slots }) {
    return () => h('div', { class: 'el-input' }, [
      h('input', { placeholder: props.placeholder }),
      slots.append ? h('span', { class: 'el-input__append' }, slots.append()) : null,
    ])
  },
})

const ElTag = defineComponent({
  name: 'ElTag',
  props: {
    type: String,
    effect: String,
    size: String,
  },
  setup(props, { slots }) {
    return () => h('span', {
      class: ['el-tag', props.type && `el-tag--${props.type}`, props.effect && `is-${props.effect}`, props.size && `el-tag--${props.size}`],
    }, slots.default?.())
  },
})

const ElAvatar = defineComponent({
  name: 'ElAvatar',
  props: {
    size: [Number, String],
  },
  setup(props, { slots }) {
    const size = typeof props.size === 'number' ? `${props.size}px` : props.size
    return () => h('span', { class: 'el-avatar', style: size ? { width: size, height: size } : undefined }, slots.default?.())
  },
})

const ElSegmented = defineComponent({
  name: 'ElSegmented',
  props: {
    modelValue: String,
    options: {
      type: Array as PropType<string[]>,
      default: () => [],
    },
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    return () => h('div', { class: 'el-segmented' }, props.options.map((option) => h('button', {
      class: { active: props.modelValue === option },
      onClick: () => emit('update:modelValue', option),
    }, option)))
  },
})

const ElDatePicker = defineComponent({
  name: 'ElDatePicker',
  props: {
    startPlaceholder: String,
    endPlaceholder: String,
  },
  setup(props) {
    return () => h('div', { class: 'el-date-picker' }, [
      h('input', { placeholder: props.startPlaceholder || '开始日期' }),
      h('span', '-'),
      h('input', { placeholder: props.endPlaceholder || '结束日期' }),
    ])
  },
})

const ElEmpty = defineComponent({
  name: 'ElEmpty',
  props: {
    description: String,
  },
  setup(props) {
    return () => h('div', { class: 'el-empty' }, [
      h('div', { class: 'el-empty__icon' }, '∅'),
      h('p', props.description || '暂无数据'),
    ])
  },
})

createApp(App)
  .component('ElButton', ElButton)
  .component('ElCard', ElCard)
  .component('ElInput', ElInput)
  .component('ElTag', ElTag)
  .component('ElAvatar', ElAvatar)
  .component('ElSegmented', ElSegmented)
  .component('ElDatePicker', ElDatePicker)
  .component('ElEmpty', ElEmpty)
  .use(createPinia())
  .use(router)
  .mount('#app')
