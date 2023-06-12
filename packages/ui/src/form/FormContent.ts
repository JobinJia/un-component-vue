import { type Component, type PropType, type VNode, h, resolveComponent, unref, useModel } from 'vue'
import { type Recordable, isFunction } from '@un-component-vue/shard'

import { defineComponent } from 'vue'
import type { ColSlotKey, FormSchema, FormSchemas } from './typing'
import { COM_SLOTS_PREFIX } from './constans'
import FormItem from './FormItem'

export default defineComponent({
  name: 'FormContent',
  components: {
    FormItem,
  },
  props: {
    formItem: {
      type: [Object, String] as PropType<string>,
    },
    schemas: {
      type: Object as PropType<FormSchemas>,
    },
    modelValue: {
      type: Object as PropType<Recordable>,
    },
  },
  setup: (props, ctx) => {
    const model = useModel(props, 'modelValue')
    const getCustomContentSlots = () => {
      const slots = ctx.slots ?? {}
      const contentSlots: Record<string, unknown> = {}
      Object.keys(slots).forEach((k) => {
        if (k.startsWith(COM_SLOTS_PREFIX))
          contentSlots[k] = slots[k]
      })
      return contentSlots
    }

    const renderItem = (s: FormSchema) => {
      const { key } = s
      const FormContentItem = resolveComponent('FormItem') as string
      return h(FormContentItem, {
        key,
        schema: s,
        formItem: props.formItem,
        model: unref(model),
      }, getCustomContentSlots())
    }

    const renderChildren = (s: FormSchema) => {
      const { children = [] } = s
      if (children.length > 0) {
        const ThisComp = resolveComponent('FormContent')
        const r = h(ThisComp, {
          'schemas': children,
          'formItem': props.formItem,
          'modelValue': props.modelValue,
          'onUpdate:modelValue': (m: Recordable) => {
            model.value = m
          },
        })
        return r
      }
      return renderItem(s)
    }

    const renderGroupSlots = (s: FormSchema) => {
      const { key, groupSlots = {} } = s
      const prefixSlotKey: ColSlotKey = `col:${key}:prefix`
      const suffixSlotKey: ColSlotKey = `col:${key}:suffix`
      const prefix: (() => Element | VNode | VNode[] | string) | null = groupSlots?.[prefixSlotKey] ?? ctx.slots?.[prefixSlotKey] ?? null
      const suffix: (() => Element | VNode | VNode[] | string) | null = groupSlots?.[suffixSlotKey] ?? ctx.slots?.[suffixSlotKey] ?? null
      const slotArrary: unknown[] = []
      if (prefix)
        slotArrary.unshift(prefix())

      slotArrary.push(renderChildren(s))
      if (suffix)
        slotArrary.push(suffix())

      return () => slotArrary
    }

    const renderContent = () => {
      const schemas = props?.schemas ?? []
      return schemas.map((s) => {
        const { key, component, render, group, groupProps = {} } = s
        if (!component) {
          if (render && isFunction(render)) {
            const r: () => VNode | VNode[] | Element | Component = render
            return r()
          }
          if (ctx.slots?.[key])
            return ctx.slots[key]?.()
        }
        if (group) {
          const GroupComp = resolveComponent(group)
          return h(GroupComp, groupProps, renderGroupSlots(s))
        } else {
          return renderItem(s)
        }
      })
    }

    return () => {
      return renderContent()
    }
  },
})
