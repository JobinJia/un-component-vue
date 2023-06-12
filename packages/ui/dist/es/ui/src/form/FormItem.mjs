import { defineComponent as P, useModel as $, resolveComponent as i, h as c, unref as b } from "vue";
import { isFunction as l } from "../../../shard/utils/is.mjs";
import { COM_SLOTS_PREFIX as v } from "./constans.mjs";
import { set as M } from "lodash-es";
const w = P({
  name: "FormContentItem",
  props: {
    formItem: {
      type: [Object, String],
      required: !0
    },
    schema: {
      type: Object,
      required: !0
    },
    model: {
      type: Object,
      required: !0
    }
  },
  setup(s, d) {
    const f = $(s, "model"), p = (e) => {
      var n;
      const { key: o } = e, t = `${v}${o}`;
      return (n = d.slots) == null ? void 0 : n[t];
    };
    function a(e) {
      const { key: o, component: t, componentProps: r = {}, modelKey: n = "value", nested: S = !0, field: u, componentSlots: y = {} } = e;
      if (!t) {
        const m = p(e);
        return m ? c(m) : (console.warn(`The value of a slot [${o}] or component with the name: [${t}] cannot be empty!`), null);
      }
      const F = l(r) ? r() : r, h = () => u ? {
        [n]: s.model[u],
        [`onUpdate:${n}`]: (m) => {
          S ? M(b(f), u, m) : f.value[u] = m;
        }
      } : {};
      if (l(t))
        return t();
      const O = i(t);
      return c(
        O,
        {
          ...F,
          ...h()
        },
        y
      );
    }
    function C({ schema: e }) {
      const { formItemProps: o = {}, formItemSlots: t = {} } = e, r = l(o) ? o() : o, n = i(s.formItem);
      return c(
        n,
        r,
        {
          default: () => a(e),
          ...t
        }
      );
    }
    function I() {
      const e = s.schema;
      return C({ schema: e });
    }
    return () => I();
  }
});
export {
  w as default
};
