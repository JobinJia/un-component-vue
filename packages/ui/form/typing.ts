import type { Functional, Recordable } from '@un-component-vue/shard'
import type { Component, SlotsType, VNode } from 'vue'

export interface CustomSlotsType {
  [K: string]: () => Element | VNode | VNode[] | Component | string
}

export interface FormContentComponentProps {
  [Component: string]: unknown
}
export interface FormItemProps {
  [FormItemName: string]: unknown
}
export interface FormGroupProps {
  [GroupName: string]: unknown
}

export type FormContentComponentPropsKeys = keyof FormContentComponentProps
export type FormItemPropsKeys = keyof FormItemProps
export type FormGroupPropsKeys = keyof FormGroupProps

interface SchemaItem<C extends FormContentComponentPropsKeys, F extends FormItemPropsKeys, G extends FormGroupPropsKeys> {
  /**
   * unique key
   * if don't set component and render, it's template slot name
   */
  key: Readonly<string>
  /**
   * model's key
   */
  field?: keyof Recordable
  /**
   * form-item inner component,
   */
  component?: (() => VNode | VNode[] | Element) | C
  /**
   * v-model key
   * @example v-model is `modelValue`, v-model:checked is `checked`, v-model:value is `value`
   * @default `value``
   */
  modelKey?: string
  /**
   * component props
   */
  componentProps?: Functional<FormContentComponentProps[C] & { style?: Partial<CSSStyleDeclaration> }>
  /**
   * form-item component props
   */
  formItemProps?: Functional<FormItemProps[F] & { style?: Partial<CSSStyleDeclaration> }>
  /**
   * form-item slots conent, if set default slot, will repleace component
   */
  formItemSlots?: SlotsType | CustomSlotsType
  /**
   * component slots
   */
  componentSlots?: SlotsType | CustomSlotsType
  /**
   * custom form-item
   * @returns
   */
  render?: () => VNode | VNode[] | Element | Component

  /**
   * nested model object
   * @default true
   */
  nested?: boolean
  /**
 * group row or col props
 */
  group?: G
  /**
   * group props
   */
  groupProps?: FormGroupProps[G] & { style?: Partial<CSSStyleDeclaration> }
  groupSlots?: GroupSlotsType
  children?: FormSchemas<C, F, G>
}
export type ColSlotType = 'prefix' | 'suffix'
export type ColSlotKey = `col:${string}:${ColSlotType}`
export type GroupSlotsType = Partial<{
  [K: ColSlotKey]: () => Element | VNode | VNode[] | string
}>

export type FormSchema<
  C extends FormContentComponentPropsKeys = FormContentComponentPropsKeys,
  F extends FormItemPropsKeys = FormItemPropsKeys,
  G extends FormGroupPropsKeys = FormGroupPropsKeys,
> = {
  [K in C]: SchemaItem<K, F, G>
}[C]

export type FormSchemas<
  C extends FormContentComponentPropsKeys = FormContentComponentPropsKeys,
  F extends FormItemPropsKeys = FormItemPropsKeys,
  G extends FormGroupPropsKeys = FormGroupPropsKeys,
> = FormSchema<C, F, G>[]

// TODO: form-item slots type
// TODO: component slots type
