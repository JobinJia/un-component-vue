import { defineComponent, h, resolveComponent, unref, useModel } from 'vue'
import { type Recordable, isFunction } from '@un-component-vue/shard'

import type {
  ColSlotKey,
  FormContentComponentPropsKeys,
  FormGroupPropsKeys,
  FormItemPropsKeys,
  FormSchema,
  FormSchemas,
  GroupSlotsType,
} from './typing'
import { COM_SLOTS_PREFIX } from './constans'
import FormItem from './FormItem'

export default defineComponent(
  <C extends FormContentComponentPropsKeys = FormContentComponentPropsKeys,
    F extends FormItemPropsKeys = FormItemPropsKeys,
    G extends FormGroupPropsKeys = FormGroupPropsKeys,
  >(props: { formItem: string; schemas: FormSchemas<C, F, G>; modelValue: Recordable }, ctx: any) => {
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

    const renderItem = (s: FormSchema<C, F, G>) => {
      const { key } = s
      const FormContentItem = resolveComponent('FormItem') as string
      return h(FormContentItem, {
        key,
        schema: s,
        formItem: props.formItem,
        model: unref(model),
      }, getCustomContentSlots())
    }

    const renderChildren = (s: FormSchema<C, F, G>) => {
      const { children = [] } = s
      if (children.length > 0) {
        const ThisComp = resolveComponent('FormContent')
        return h(ThisComp, {
          'schemas': children,
          'formItem': props.formItem,
          'modelValue': props.modelValue,
          'onUpdate:modelValue': (m: Recordable) => {
            model.value = m
          },
        })
      }
      return renderItem(s)
    }

    const renderGroupSlots = (s: FormSchema<C, F, G>) => {
      const { key, groupSlots = {} as GroupSlotsType } = s
      const prefixSlotKey: ColSlotKey = `col:${key}:prefix`
      const suffixSlotKey: ColSlotKey = `col:${key}:suffix`
      const prefix = groupSlots?.[prefixSlotKey] ?? ctx.slots?.[prefixSlotKey] ?? null
      const suffix = groupSlots?.[suffixSlotKey] ?? ctx.slots?.[suffixSlotKey] ?? null
      const slotArray: unknown[] = []
      if (prefix)
        slotArray.unshift(prefix())

      slotArray.push(renderChildren(s))
      if (suffix)
        slotArray.push(suffix())

      return () => slotArray
    }

    const renderContent = () => {
      const schemas = props?.schemas ?? []
      return schemas.map((s) => {
        const { key, component, render, group, groupProps = {} } = s
        if (!component) {
          if (render && isFunction(render))
            return render()

          if (ctx.slots?.[key])
            return ctx.slots[key]?.()
        }
        if (group) {
          const GroupComp = resolveComponent(group as string)
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
  {
    name: 'FormContent',
    components: {
      FormItem,
    },
    props: ['formItem', 'schemas', 'modelValue'],
  } as any,
)
