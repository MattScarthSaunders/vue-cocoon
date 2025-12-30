import { inject } from "vue"

const DEPS_KEY = Symbol("cocoon")

export function getDeps<T extends Record<string, any>>() {
  const deps = inject<T>(DEPS_KEY) as Record<string, any> | undefined

  if (!deps) {
    throw new Error("[cocoon] Dependencies not provided")
  }

  return new Proxy(deps, {
    get(target, prop: string) {
      if (!(prop in target)) {
        console.warn(`[cocoon] Service "${prop}" was not registered`)
        return undefined
      }

      const value = target[prop]
      
      if (typeof value === "function" && value.prototype === undefined) {
        const instance = (value as () => any)()
        target[prop] = instance
        return instance
      }

      return value
    },
  }) as T

}

export { DEPS_KEY }
