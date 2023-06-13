import { type ComputedOptions, type ConcreteComponent, type MethodOptions, unref, useModel } from 'vue'
import { type Recordable, isFunction } from '@un-component-vue/shard'

import { defineComponent, h, resolveComponent } from 'vue'
import { set } from 'lodash-es'
import { COM_SLOTS_PREFIX } from './constans'
import type { FormContentComponentPropsKeys, FormGroupPropsKeys, FormItemPropsKeys, FormSchema } from './typing'

export default defineComponent(
  <C extends FormContentComponentPropsKeys = FormContentComponentPropsKeys,
    F extends FormItemPropsKeys = FormItemPropsKeys,
    G extends FormGroupPropsKeys = FormGroupPropsKeys>(props: { formItem: string; schema: FormSchema<C, F, G>; model: Recordable }, ctx: any) => {
    const vModel = useModel(props, 'model')

    const getCustomComponentSlot = (schema: FormSchema<C, F, G>) => {
      const { key } = schema
      const slotKey = `${COM_SLOTS_PREFIX}${key}`
      return ctx.slots?.[slotKey]
    }

    function renderComponent(schema: FormSchema<C, F, G>) {
      const { key, component, componentProps = {}, modelKey = 'value', nested = true, field, componentSlots = {} } = schema
      if (!component) {
        const customSlot = getCustomComponentSlot(schema)
        if (customSlot)
          return h(customSlot)

        console.warn(`The value of a slot [${key}] or component with the name: [${component}] cannot be empty!`)
        return null
      }
      const cProps = isFunction(componentProps) ? componentProps() : componentProps

      const genVModel = () => {
        if (!field)
          return {}

        return {
          [modelKey]: props.model[field],
          [`onUpdate:${modelKey}`]: (val: unknown) => {
            if (nested)
              set<Recordable>(unref(vModel), field, val)
            else
              (vModel.value as Recordable)[field] = val
          },
        }
      }
      if (isFunction(component))
        return component()
      const Content = resolveComponent(component as string) as ConcreteComponent<{}, any, any, ComputedOptions, MethodOptions>
      return h(
        Content,
        {
          ...cProps,
          ...genVModel(),
        },
        componentSlots,
      )
    }
    function renderFormItem({ schema }: { schema: FormSchema<C, F, G> }) {
      const { formItemProps = {}, formItemSlots = {} } = schema
      const fProps = isFunction(formItemProps) ? formItemProps() : formItemProps
      const FormItem = resolveComponent(props.formItem) as string
      return h(
        FormItem,
        fProps,
        {
          default: () => renderComponent(schema),
          ...formItemSlots,
        },
      )
    }

    function renderContent() {
      const schema = props.schema
      return renderFormItem({ schema })
    }
    return () => {
      return renderContent()
    }
  },
  {
    name: 'FormItem',
    props: ['formItem', 'schema', 'model'],
  },
)
