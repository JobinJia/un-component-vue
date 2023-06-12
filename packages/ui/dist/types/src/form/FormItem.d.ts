import { type PropType, type VNode } from 'vue';
import { type Recordable } from '@un-component-vue/shard';
declare const _default: import("vue").DefineComponent<{
    formItem: {
        type: PropType<string>;
        required: true;
    };
    schema: {
        type: PropType<never>;
        required: true;
    };
    model: {
        type: PropType<Recordable>;
        required: true;
    };
}, () => VNode<import("vue").RendererNode, import("vue").RendererElement, {
    [key: string]: any;
}>, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    formItem: {
        type: PropType<string>;
        required: true;
    };
    schema: {
        type: PropType<never>;
        required: true;
    };
    model: {
        type: PropType<Recordable>;
        required: true;
    };
}>>, {}, {}>;
export default _default;
