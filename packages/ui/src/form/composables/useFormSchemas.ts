import { shallowRef } from 'vue'
import { isNumber } from '@un-component-vue/shard'
import type { FormContentComponentPropsKeys, FormGroupPropsKeys, FormItemPropsKeys, FormSchema, FormSchemas } from '../typing'

export function useFormSchemas<
  C extends FormContentComponentPropsKeys = FormContentComponentPropsKeys, F extends FormItemPropsKeys = FormItemPropsKeys, G extends FormGroupPropsKeys = FormGroupPropsKeys,
>(schemas: FormSchemas<C, F, G>) {
  const schemasRef = shallowRef<FormSchemas<C, F, G>>(schemas)

  const addSchemas = (list: FormSchemas<C, F, G>, index: number, direction: boolean, source: FormSchemas<C, F, G> = schemasRef.value) => {
    let cache = [...source]
    if (direction) {
      list.forEach((it, id) => {
        cache.splice(index + id, 0, it)
      })
    } else {
      cache = [...cache.slice(0, index), ...list, ...cache.slice(index)]
    }
    return cache
  }

  const getSchemaIndex = (list: FormSchemas<C, F, G>, direction: boolean, key?: string | number) => {
    let index = direction ? list.length : 0
    if (key)
      index = isNumber(key) ? key as number : list.findIndex(it => it.key === key)

    return index
  }

  const addGroupSchemas = (list: FormSchemas<C, F, G>, direction: boolean, groupKey: string, schemaList: FormSchemas<C, F, G> = schemasRef.value, itemKey?: string | number) => {
    const cache = [...schemaList]
    for (let i = 0; i < cache.length; i++) {
      const item = cache[i]
      if (item.key === groupKey) {
        if (item.children && item.group !== undefined) {
          const index = getSchemaIndex(item.children, direction, itemKey)
          item.children = addSchemas(list, index, direction, item.children)
          break
        }
      } else if (item.children) {
        addGroupSchemas(list, direction, groupKey, item.children, itemKey)
      }
    }
    return cache
  }

  const delFormSchemaByKeys = (keys: string[], tree: FormSchemas<C, F, G> = schemasRef.value): FormSchemas<C, F, G> => {
    return tree.filter((node) => {
      if (node.children)
        node.children = delFormSchemaByKeys(keys, node.children)

      return !keys.includes(node.key)
    })
  }

  const addSchema = (schema: FormSchema<C, F, G> | FormSchemas<C, F, G>, options?: {
    groupKey?: string | undefined
    key?: string | number
    direction?: boolean
  }) => {
    const { key, direction, groupKey } = Object.assign({}, {
      direction: true,
      groupKey: undefined,
    }, options)
    const list = Array.isArray(schema) ? schema : [schema]
    if (groupKey === undefined) {
      const index = getSchemaIndex(schemasRef.value, direction, key)
      if (index < 0) {
        console.warn(`Schemas not find item with key: ${key}`)
        return
      }
      schemasRef.value = addSchemas(list, index, direction)
    } else {
      schemasRef.value = addGroupSchemas(list, direction, groupKey, schemasRef.value, key)
    }
  }

  const delSchema = (key: string | string[]) => {
    const keys = Array.isArray(key) ? key : [key]
    schemasRef.value = delFormSchemaByKeys(keys)
  }

  const updSchema = (schema: FormSchema<C, F, G>, list: FormSchemas<C, F, G> = schemasRef.value) => {
    const cache = [...list]
    for (let i = 0; i < cache.length; i++) {
      const it = cache[i]
      if (it.key === schema.key) {
        cache[i] = schema
        break
      }
      if (it.children)
        Reflect.set(cache[i], 'children', updSchema(schema, it.children))
    }
  }

  return {
    schemasRef,
    addSchema,
    delSchema,
    updSchema,
  }
}
