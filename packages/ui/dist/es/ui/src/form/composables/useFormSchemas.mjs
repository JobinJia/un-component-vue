import { shallowRef as v } from "vue";
import { isNumber as S } from "../../../../shard/utils/is.mjs";
function A(m) {
  const l = v(m), a = (e, c, r, i = l.value) => {
    let n = [...i];
    return r ? e.forEach((t, o) => {
      n.splice(c + o, 0, t);
    }) : n = [...n.slice(0, c), ...e, ...n.slice(c)], n;
  }, d = (e, c, r) => {
    let i = c ? e.length : 0;
    return r && (i = S(r) ? r : e.findIndex((n) => n.key === r)), i;
  }, h = (e, c, r, i = l.value, n) => {
    const t = [...i];
    for (let o = 0; o < t.length; o++) {
      const s = t[o];
      if (s.key === r) {
        if (s.children && s.group !== void 0) {
          const f = d(s.children, c, n);
          console.log(f), s.children = a(e, f, c, s.children);
          break;
        }
      } else
        s.children && h(e, c, r, s.children, n);
    }
    return t;
  }, u = (e, c = l.value) => c.filter((r) => (r.children && (r.children = u(e, r.children)), !e.includes(r.key)));
  return {
    schemasRef: l,
    addSchema: (e, c) => {
      const { key: r, direction: i, groupKey: n } = Object.assign({}, {
        direction: !0,
        groupKey: void 0
      }, c), t = Array.isArray(e) ? e : [e];
      if (n === void 0) {
        const o = d(l.value, i, r);
        if (o < 0) {
          console.warn(`Schemas not find item with key: ${r}`);
          return;
        }
        l.value = a(t, o, i);
      } else
        l.value = h(t, i, n, l.value, r);
    },
    delSchema: (e) => {
      const c = Array.isArray(e) ? e : [e];
      l.value = u(c);
    }
  };
}
export {
  A as useFormSchemas
};
