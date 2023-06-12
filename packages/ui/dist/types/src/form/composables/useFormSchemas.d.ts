import type { FormSchema, FormSchemas, FormContentComponentPropsKeys, FormItemPropsKeys, FormGroupPropsKeys } from "../typing";
export declare function useFormSchemas<C extends FormContentComponentPropsKeys = FormContentComponentPropsKeys, F extends FormItemPropsKeys = FormItemPropsKeys, G extends FormGroupPropsKeys = FormGroupPropsKeys>(schemas: FormSchemas<C, F, G>): {
    schemasRef: import("vue").ShallowRef<FormSchemas<C, F, G>>;
    addSchema: (schema: FormSchema<C, F, G> | FormSchemas<C, F, G>, options?: {
        groupKey?: string | undefined;
        key?: string | number;
        direction?: boolean;
    }) => void;
    delSchema: (key: string | string[]) => void;
};
