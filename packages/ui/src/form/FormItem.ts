import { type PropType, type VNode, unref, useModel } from 'vue'
import { type Recordable, isFunction } from '@un-component-vue/shard'

import { defineComponent, h, resolveComponent } from 'vue'
import { set } from 'lodash-es'
import { COM_SLOTS_PREFIX } from './constans'
import type { FormSchema } from './typing'

export default defineComponent({
  name: 'FormContentItem',
  props: {
    formItem: {
      type: [Object, String] as PropType<string>,
      required: true,
    },
    schema: {
      type: Object as unknown as PropType<FormSchema>,
      required: true,
    },
    model: {
      type: Object as PropType<Recordable>,
      required: true,
    },
  },
  setup(props, ctx) {
    const vModel = useModel(props, 'model')

    const getCustomComponentSlot = (schema: FormSchema) => {
      const { key } = schema
      const slotKey = `${COM_SLOTS_PREFIX}${key}`
      const currentSlot = ctx.slots?.[slotKey]
      return currentSlot
    }

    function renderComponent(schema: FormSchema) {
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
      if (isFunction(component)) {
        const r: () => VNode | VNode[] | Element = component
        return r()
      }
      const Content = resolveComponent(component) as Element
      return h(
        Content,
        {
          ...cProps,
          ...genVModel(),
        },
        componentSlots,
      )
    }
    function rednerFormItem({ schema }: { schema: FormSchema }) {
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
      return rednerFormItem({ schema })
    }
    return () => {
      return renderContent()
    }
  },
})
