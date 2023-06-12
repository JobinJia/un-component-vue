// import type { FormContentComponentProps, FormItemProps, FormGroupProps } from '@un-component-vue/ui'
import type { FormContentComponentProps, FormItemProps, FormGroupProps } from '@un-component-vue/ui/form/typing'
import type {
  InputProps as NInputProps,
  InputNumberProps as NInputNumberProps,
  SelectProps as NSelectProps,
  RowProps as NRowProps,
  ColProps as NColProps,
  FormItemProps as NFormItemProps,
  GridProps as NGridProps,
  GridItemProps as NGridItemProps,
  FormItemGiProps as NFromItemGiProps,
} from 'naive-ui'

import type {
  InputProps as AInputProps,
  InputNumberProps as AInputNumberProps,
  SelectProps as ASelectProps,
  RowProps as ARowProps,
  ColProps as AColProps,
  FormItemProps as AFormItemProps,
  RadioProps as ARadioPropps,
  RadioGroupProps as ARadioGroupProps,
  SwitchProps as NSwitchPProps
} from 'ant-design-vue'

import type {
  InputProps as TInputProps,
  InputNumberProps as TInputNumberProps,
  TdFormItemProps
} from 'tdesign-vue-next'

declare module '@un-component-vue/ui' {
  interface FormItemProps {
    'n-form-item': NFormItemProps,
    'n-form-item-gi': NFromItemGiProps,
    'a-form-item': AFormItemProps,
    't-form-item': TdFormItemProps
  }
  interface FormGroupProps {
    'a-row': ARowProps,
    'a-col': AColProps,
    'n-row': NRowProps,
    'n-col': NColProps,
    'n-grid': NGridProps,
    'n-grid-item': NGridItemProps,
    'n-gi': NGridItemProps
  }
  interface FormContentComponentProps {
    'n-input': NInputProps
    'n-input-number': NInputNumberProps
    'n-select': NSelectProps
    'n-switch': SwitchProps
    'a-input': AInputProps
    'a-input-number': AInputNumberProps
    'a-select': ASelectProps
    'a-radio': ARadioPropps
    'a-radio-group': ARadioGroupProps
    // 'el-input': ElInputProps
    // 'el-input-number': ElInputNumberProps
    't-input': TInputProps
    't-input-number': TInputNumberProps
  }
}
