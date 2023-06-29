import type { FormContentComponentPropsKeys, FormGroupPropsKeys, FormItemPropsKeys, FormSchema } from '../typing'

export function defineFormSchema<
  C extends FormContentComponentPropsKeys = FormContentComponentPropsKeys,
  G extends FormGroupPropsKeys = FormGroupPropsKeys,
  F extends FormItemPropsKeys = FormItemPropsKeys,
>(schema: FormSchema<C, F, G>) {
  return schema
}

// export function defineFormSchemas<
//   C extends FormContentComponentPropsKeys = FormContentComponentPropsKeys,
//   G extends FormGroupPropsKeys = FormGroupPropsKeys,
//   F extends FormItemPropsKeys = FormItemPropsKeys,
// >(schemas: FormSchema<F, G, C>[]) {
//   return schemas
// }

// Test Type
// const a = defineFormSchema({
//   key: 'a',
//   component: 'n-input',
//   componentProps: {}
// })

// const arr1 = defineFormSchemas<'n-input' | 'n-input-number'>([
//   {
//     key: 'a',
//     component: 'n-input',
//     componentProps: {}
//   },
//   {
//     key: 'b',
//     component: 'n-input-number',
//     componentProps: {}
//   }
// ])

// // Test Type
// const arr = defineFormSchemas([
//   defineFormSchema({
//     key: 'a',
//     component: 'n-input',
//     componentProps: {},
//   }),
//   defineFormSchema({
//     key: 'b',
//     component: 'n-input-number',
//     componentProps: {}
//   }),
//   defineFormSchema({
//     key: 'b',
//     component: 'n-input-number',
//     componentProps: {}
//   }),
//   defineFormSchema({
//     key: 'b',
//     component: 'n-input-number',
//     componentProps: {}
//   }),
//   defineFormSchema({
//     key: 'b',
//     component: 'n-select',
//     componentProps: {}
//   })
// ])

// const arr2 = [
//   defineFormSchema({
//     key: 'a',
//     component: 'n-input',
//     componentProps: {},
//   }),
//   defineFormSchema({
//     key: 'b',
//     component: 'n-input-number',
//     componentProps: {}
//   }),
//   defineFormSchema({
//     key: 'b',
//     component: 'n-input-number',
//     componentProps: {}
//   }),
//   defineFormSchema({
//     key: 'b',
//     component: 'n-input-number',
//     componentProps: {}
//   }),
//   defineFormSchema({
//     key: 'b',
//     component: 'n-select',
//     componentProps: {}
//   })
// ]
