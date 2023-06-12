import { defineComponent as S, useModel as V, resolveComponent as d, h, unref as b } from "vue";
import { isFunction as j } from "../../../shard/utils/is.mjs";
import { COM_SLOTS_PREFIX as x } from "./constans.mjs";
import g from "./FormItem.mjs";
const K = S({
  name: "FormContent",
  components: {
    FormItem: g
  },
  props: {
    formItem: {
      type: [Object, String]
    },
    schemas: {
      type: Object
    },
    modelValue: {
      type: Object
    }
  },
  setup: (s, c) => {
    const C = V(s, "modelValue"), y = () => {
      const t = c.slots ?? {}, e = {};
      return Object.keys(t).forEach((o) => {
        o.startsWith(x) && (e[o] = t[o]);
      }), e;
    }, p = (t) => {
      const { key: e } = t, o = d("FormItem");
      return h(o, {
        key: e,
        schema: t,
        formItem: s.formItem,
        model: b(C)
      }, y());
    }, I = (t) => {
      const { children: e = [] } = t;
      if (e.length > 0) {
        const o = d("FormContent");
        return h(o, {
          schemas: e,
          formItem: s.formItem,
          modelValue: s.modelValue,
          ["onUpdate:modelValue"]: (r) => {
            C.value = r;
          }
        });
      }
      return p(t);
    }, F = (t) => {
      var f, i;
      const { key: e, component: o, groupSlots: n = {} } = t, r = `col:${e}:prefix`, l = `col:${e}:suffix`, a = (n == null ? void 0 : n[r]) ?? ((f = c.slots) == null ? void 0 : f[r]) ?? null, u = (n == null ? void 0 : n[l]) ?? ((i = c.slots) == null ? void 0 : i[l]) ?? null, m = [];
      return a && m.unshift(a()), m.push(I(t)), u && m.push(u()), () => m;
    }, O = () => ((s == null ? void 0 : s.schemas) ?? []).map((e) => {
      var u, m, f;
      const { key: o, component: n, render: r, group: l, groupProps: a = {} } = e;
      if (!n) {
        if (r && j(r))
          return r();
        if ((u = c.slots) != null && u[o])
          return (f = (m = c.slots)[o]) == null ? void 0 : f.call(m);
      }
      if (l) {
        const i = d(l);
        return h(i, a, F(e));
      } else
        return p(e);
    });
    return () => O();
  }
});
export {
  K as default
};
