<script setup lang="tsx">
import { h, ref, unref } from 'vue'
import { UnFormContent, defineFormSchema, useFormSchemas } from '@un-component-vue/ui'

const model = ref({
  a: 'abcd',
  b: 10,
  c: 3,
  d: '',
  e: '',
  f: 0,
  group: {},
  antDisable: '2',
  direction: true,
})

const schemasNaive = [
  defineFormSchema({
    key: 'a',
    field: 'a',
    component: 'n-input',
    formItemProps: {
      label: 'N-Input',
      rule: [
        { required: true, message: '不能为空', trigger: 'input' },
      ],
      path: 'a',
    },
    componentProps: {
      clearable: true,
    },
    formItemSlots: {
    },
    componentSlots: {
      prefix: () => <div>前缀</div>,
      suffix: () => '后缀',
    },
  }),
  defineFormSchema({
    key: 'b',
    field: 'b',
    component: 'n-input-number',
    formItemProps: {
      label: 'N Number',
    },
    componentProps: () => {
      return {}
    },
    componentSlots: {
      prefix: () => h('span', null, '给爷打钱: '),
      suffix: () => '百万元',
    },
  }),
  defineFormSchema({
    key: 'c',
  }),
  defineFormSchema({
    key: 'd',
    render: () => {
      return (
        <div>
          JSX渲染
        </div>
      )
    },
  }),
  defineFormSchema({
    key: 'e',
    render: () => {
      if (unref(model).b >= 10)
        return <h1>感谢大哥给了我{unref(model).b}百万元</h1>

      return h('h5', {}, '也太抠了吧, 10百万都不给??')
    },
  }),
  defineFormSchema({
    key: 'f',
    render: () => {
      const options = Array.from({ length: 30 }).map((_, i) => ({ label: `Option${i}`, value: i }))
      return (
        <n-form-item label="renderF">
          <n-select v-model={[model.value.f, 'value']} options={options}></n-select>
        </n-form-item>
      )
    },
  }),
  defineFormSchema({
    key: 'addDirection',
    field: 'direction',
    component: 'n-switch',
    formItemProps: {
      label: '添加方向',
    },
    componentSlots: {
      checked: () => '向后添加',
      unchecked: () => '向前添加',
    },
  }),
  defineFormSchema({
    key: 'delKey',
    field: 'delKey',
    component: 'n-input',
    formItemProps: {
      label: 'Del key',
    },
  }),
  defineFormSchema({
    key: 'button',
    formItemProps: {
    },
    component: () => {
      return (
        <n-button onClick={addNaive} type="primary">
          添加
        </n-button>
      )
    },
  }),
]

const { schemasRef, addSchema, delSchema } = useFormSchemas(schemasNaive)
let i = 1
function addNaive() {
  const key = `dynamicGroup-${i}`
  const item = defineFormSchema({
    key,
    group: 'n-row',
    groupProps: {
      // gutter: 12,
    },
    children: [
      defineFormSchema({
        key: `dynamic-${i}`,
        field: `dynamic${i}`,
        component: 'n-input',
        componentProps: {
          style: {
            flex: 1,
          },
        } as any,
        group: 'n-col',
        groupProps: {
          span: 24,
          style: {
            display: 'flex',
          },
        },
        formItemProps: {
          label: `Dynamic Input ${i}`,
        },
        groupSlots: {
          [`col:dynamic-${i}:suffix`]: () => {
            return (
              <n-button type="error" onClick={handleDel.bind(null, `${key}`)}>Del Item</n-button>
            )
          },
        },
      }),
    ],
  })

  addSchema(item, { direction: model.value.direction })
  i++
}

function handleDel(key: string) {
  delSchema(key)
}

const schemasAnt = [
  defineFormSchema({
    key: 'b',
    field: 'b',
    formItemProps: {
      label: 'A Number',
    },
    component: 'a-input-number',
    componentProps: {},
  }),
  defineFormSchema({
    key: 'a',
    field: 'a',
    component: 'a-input',
    formItemProps: {
      label: 'A Input',
    },
    componentProps: {},
    formItemSlots: {
      extra: () => 'antd formitem extra slot',
    },
  }),
  defineFormSchema({
    key: 'c',
    field: 'c',
    formItemProps: {
      label: 'CompSelectRender',
    },
    component: () => {
      const options = Array.from({ length: 10 }).map((_, i) => ({ label: `Options${i}`, value: i }))
      return (
        <a-select options={options}></a-select>
      )
    },
  }),
  defineFormSchema({
    key: 'd',
    formItemProps: {
      label: 'Component:D',
    },
  }),
  defineFormSchema({
    key: 'antDisable',
    field: 'antDisable',
    component: 'a-radio-group',
    componentSlots: {
      default: () => (
        <>
          <a-radio value="2">关</a-radio>
          <a-radio value="1">开</a-radio>
        </>
      ),
    },
    formItemProps: {
      label: 'antDisable',
    },
  }),
  defineFormSchema({
    key: 'e',
    group: 'a-row',
    groupProps: {
      gutter: 24,
    },
    children: Array.from({ length: 10 }).map((_, i) => (
      defineFormSchema({
        key: `group.field-${i}`,
        field: `group.field-${i}`,
        component: 'a-input',
        componentProps: () => ({
          disabled: model.value.antDisable === '1',
        }),
        group: 'a-col',
        nested: i % 2 === 0,
        groupSlots: {
          [`col:group.field-${i}:suffix`]: () => {
            return (
              <a-tooltip title={`开启了 nested选项: ${i % 2 === 0}`}>
                <div style="display: flex;justify-content: center;height: 32px;margin-bottom:24px;align-items:center; margin-left: 20px">提示</div>
              </a-tooltip>
            )
          },
        },
        formItemProps: {
          name: i % 2 === 0 ? ['group', `field-${i}`] : `group.field-${i}`,
          label: `field-${i}`,
          rules: [
            {
              required: true, message: `group.field-${i} 不能为空`,
            },
          ],
        },
        groupProps: {
          span: 8,
          style: {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
          },
        },
      })
    )),
  }),
  defineFormSchema({
    key: 'group-col',
    group: 'a-col',
    field: 'aCol',
    component: 'a-input-number',
    groupProps: {
      style: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
      },
    } as any,
    groupSlots: {
      'col:group-col:prefix': () => {
        return <div style="margin-bottom: 24px">prefix</div>
      },
    },
    componentProps: () => {
      return {
        disabled: unref(model).b === 3,
      }
    },
    formItemProps: {
      label: 'Acol Label',
    },
  }),
  defineFormSchema({
    key: 'ant-button',
    render: () => {
      return <a-button type="primary" onClick={handleAddAntGroup}>添加到组</a-button>
    },
  }),
]

const { schemasRef: schemasAntRef, addSchema: addSchemaAnt, delSchema: delSchemaAnt } = useFormSchemas(schemasAnt)
let antK = 0
function handleAddAntGroup() {
  const key = `dy-ant-${antK}`
  const item = defineFormSchema({
    key,
    field: key,
    component: 'a-input',
    componentProps: () => {
      return {
        placeholder: `Please input ${key}`,
        disabled: model.value.antDisable === '1',
      }
    },
    formItemProps: {
      label: `Dynamic Input ${antK}`,
    },
    group: 'a-col',
    groupProps: {
      span: 8,
      style: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
      },
    },
    groupSlots: {
      [`col:${key}:suffix`]: () => {
        return (
          <a-button style="margin-bottom: 24px" type="primary" danger onClick={handleDelAnt.bind(null, `${key}`)}>Del Item</a-button>
        )
      },
    },
  })
  const ck = antK === 0 ? 'group.field-4' : `dy-ant-${antK - 1}`
  addSchemaAnt(item, { direction: model.value.direction, groupKey: 'e', key: ck })
  antK++
}

function handleDelAnt(key: string) {
  delSchemaAnt(key)
}
// const schemasEl: FormSchemas = [
//   {
//     field: 'a',
//     component: 'el-input',
//     formItemProps: {
//       label: 'El Input'
//     }
//   },
//   {
//     field: 'b',
//     component: 'el-input-number',
//     modelKey: 'modelValue',
//     formItemProps: {
//       label: 'EL Number',
//     }
//   }
// ]

// const schemasSM: FormSchemas = [
//   {
//     field: 'a',
//     component: 'm-input',
//     modelKey: 'modelValue',
//     formItemProps: {
//       label: 'SM Input'
//     }
//   },
//   {
//     field: 'b',
//     component: 'm-input-number',
//     modelKey: 'modelValue',
//     formItemProps: {
//       label: 'SM Number',
//     }
//   }
// ]

const schemasT = [
  defineFormSchema({
    key: 'a',
    field: 'a',
    component: 't-input',
    formItemProps: {
      label: 'T Input',
    },
    componentProps: {
    },
  }),
  defineFormSchema({
    key: 'b',
    field: 'b',
    component: 't-input-number',
    formItemProps: {
      label: 'T Number',
    },
  }),
]
</script>

<template>
  <div>
    {{ console.log(schemasRef) }}
    <pre>
    {{ model }}
    </pre>
  </div>
  <n-divider title-placement="left">
    Niave UI
  </n-divider>
  <n-form :model="model" label-placement="left">
    <UnFormContent v-model="model" :schemas="schemasRef" form-item="n-form-item">
      <template #c>
        <h3>H3</h3>
      </template>
    </UnFormContent>
  </n-form>
  <n-divider title-placement="left">
    Ant Design Vue
  </n-divider>
  <a-form :model="model">
    <UnFormContent v-model="model" :schemas="schemasAntRef" form-item="a-form-item">
      <template #component:d>
        <a-select />
      </template>
      <template #col:group-col:suffix>
        <span style="margin-bottom: 24px;">后缀儿</span>
      </template>
    </UnFormContent>
  </a-form>
  <!-- <n-divider title-placement="left">
    Element UI
  </n-divider>
  <el-form :model="model">
    <UnFormContent v-model="model" :schema="schemasEl" form-item="el-form-item"></UnFormContent>
  </el-form>
  <n-divider title-placement="left">
    ShuiMo UI
  </n-divider>
  <m-form :model="model">
    <UnFormContent v-model="model" :schema="schemasSM" form-item="m-form-item"></UnFormContent>
  </m-form> -->
  <n-divider title-placement="left">
    Tencent UI
  </n-divider>
  <t-form :model="model">
    <UnFormContent v-model="model" :schemas="schemasT" form-item="t-form-item" />
  </t-form>
</template>

<style scoped></style>
