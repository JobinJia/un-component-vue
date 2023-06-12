import type { FormSchema, FormContentComponentPropsKeys, FormGroupPropsKeys, FormItemPropsKeys } from "../typing";
export declare function defineFormSchema<C extends FormContentComponentPropsKeys = FormContentComponentPropsKeys, F extends FormItemPropsKeys = FormItemPropsKeys, G extends FormGroupPropsKeys = FormGroupPropsKeys>(schema: FormSchema<C, F, G>): FormSchema<C, F, G>;
