import { inject } from "vue"
import type { AppDepsMap } from "./types"

/**
 * Symbol key used for providing and injecting dependencies in the Vue app context.
 * This key ensures that the dependency container is unique and avoids collisions
 * with other provided values in Vue's dependency injection system.
 * 
 * @internal
 */
export const DEPS_KEY = Symbol("vue-deps")

/**
 * Creates a proxy around the provided dependency object.
 *
 * This proxy allows:
 *  - Lazy initialization of services if they are provided as factory functions.
 *  - Warning when accessing a property that was not registered.
 *
 * @internal
 * @template T - A type extending `AppDepsMap`, representing the shape of your dependency container.
 * @param {T} deps - The object containing all registered services or factories.
 * @returns {T} A proxied version of the dependency container with lazy initialization and safety checks.
 */
export function createDepsProxy<T extends AppDepsMap>(deps: T): T {
  return new Proxy(deps as Record<string, any>, {
    get(target, prop: string) {
      if (!(prop in target)) {
        console.warn(`[cocoon] Service "${prop}" was not registered`)
        return undefined
      }

      const value = target[prop]

      // Lazy instantiate factories
      if (typeof value === "function" && value.prototype === undefined) {
        const instance = (value as () => any)()
        target[prop] = instance
        return instance
      }

      return value
    }
  }) as T
}

/**
 * Retrieves the application's dependency container from Vue's injection system
 * and returns it as a proxied object.
 *
 * This is the primary public API for consuming dependencies.
 *
 * @public
 * @template T - A type extending `AppDepsMap` representing the container of registered services.
 * @throws Will throw an error if the dependencies have not been registered via `registerDeps`.
 * @returns {T} A proxied object of the registered dependencies.
 *
 * @example
 * ```ts
 * const { userService, authService } = deps<AppDeps>()
 * userService.login()
 * ```
 */
export function deps<T extends AppDepsMap>(): T {
  const deps = inject<T>(DEPS_KEY)
  if (!deps) {
    throw new Error(
      "[cocoon] Dependencies not provided. Did you call registerDeps() in main.ts?"
    )
  }
  return createDepsProxy(deps)
}
