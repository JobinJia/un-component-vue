import { type PropType, type VNode, type Component } from 'vue';
import type { FormSchemas } from "./typing";
import { type Recordable } from '@un-component-vue/shard';
declare const _default: import("vue").DefineComponent<{
    formItem: {
        type: PropType<string>;
    };
    schemas: {
        type: PropType<FormSchemas>;
    };
    modelValue: {
        type: PropType<Recordable>;
    };
}, () => (VNode<import("vue").RendererNode, import("vue").RendererElement, {
    [key: string]: any;
}> | VNode<import("vue").RendererNode, import("vue").RendererElement, {
    [key: string]: any;
}>[] | Element | Component | undefined)[], unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    formItem: {
        type: PropType<string>;
    };
    schemas: {
        type: PropType<FormSchemas>;
    };
    modelValue: {
        type: PropType<Recordable>;
    };
}>>, {}, {}>;
export default _default;
