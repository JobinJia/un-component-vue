import type { Functional, Recordable } from '@un-component-vue/shard'
import type { Component, SlotsType, VNode } from 'vue'

export interface CustomSlotsType {
  [K: string]: () => Element | VNode | VNode[] | Component | string
}

export interface FormContentComponentProps {
}
export interface FormItemProps {
}
export interface FormGroupProps {
}

export type FormContentComponentPropsKeys = keyof FormContentComponentProps
export type FormItemPropsKeys = keyof FormItemProps
export type FormGroupPropsKeys = keyof FormGroupProps

export interface SchemaItem<
  C extends FormContentComponentPropsKeys = FormContentComponentPropsKeys,
  G extends FormGroupPropsKeys = FormGroupPropsKeys,
  F extends FormItemPropsKeys = FormItemPropsKeys,
> {
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
  componentProps?: Functional<FormContentComponentProps[C]>
  /**
   * form-item component props
   */
  formItemProps?: Functional<FormItemProps[F]>
  /**
   * form-item slots content, if set default slot, will replace component
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
  groupProps?: Functional<FormGroupProps[G]> & { style?: Partial<CSSStyleDeclaration> }
  groupSlots?: GroupSlotsType
  children?: FormSchemas
}
export type ColSlotType = 'prefix' | 'suffix'
export type ColSlotKey = `col:${string}:${ColSlotType}`
export type GroupSlotsType = Partial<{
  [K: ColSlotKey]: () => Element | VNode | VNode[] | string
}>

export type FormSchema<
  C extends FormContentComponentPropsKeys = FormContentComponentPropsKeys,
  G extends FormGroupPropsKeys = FormGroupPropsKeys,
  F extends FormItemPropsKeys = FormItemPropsKeys,
> = {
  [CK in C]: {
    [GK in G]: {
      [FK in F]: SchemaItem<CK, GK, FK>
    }
  }
}[C][G][F]

export type FormSchemas = FormSchema[]

// TODO: form-item slots type
// TODO: component slots type
