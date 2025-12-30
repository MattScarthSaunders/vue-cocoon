import type { App } from "vue"
import { DEPS_KEY, createDepsProxy } from "./helpers"
import type { AppDepsMap } from "./types"

/**
 * Options for `registerDeps`.
 *
 * @public
 */
export interface RegisterDepsOptions {
  /**
   * If true, attaches a global function to `app.config.globalProperties`
   * allowing access to dependencies without importing `deps()`.
   *
   * @default false
   */
  globalDeps?: boolean

  /**
   * If `globalDeps` is true, this overrides the default global function name (`deps`).
   * Useful to avoid naming collisions with other plugins or app properties.
   *
   * @example
   * registerDeps(app, services, { globalDeps: true, globalDepsNameOverride: "myDeps" })
   */
  globalDepsNameOverride?: string
}

/**
 * Registers an application's dependencies in Vue's DI system.
 *
 * Provides the services/factories via Vue's `provide`/`inject` system,
 * and optionally attaches a global function to `app.config.globalProperties`.
 *
 * @public
 * @template T - A type extending `AppDepsMap` representing the container of registered services.
 * @param {App} app - The Vue application instance.
 * @param {T} deps - The object containing all services or service factories to register.
 * @param {RegisterDepsOptions} [options] - Optional configuration for global attachment.
 *
 * @example
 * ```ts
 * import { createApp } from "vue"
 * import App from "./App.vue"
 * import { registerDeps } from "@your-scope/vue-deps"
 * import { UserService, AuthService } from "./services"
 *
 * const app = createApp(App)
 *
 * registerDeps(app, {
 *   userService: () => new UserService(),
 *   authService: () => new AuthService()
 * }, {
 *   globalDeps: true,
 *   globalDepsNameOverride: "myDeps" // optional custom global function name
 * })
 *
 * app.mount("#app")
 * ```
 *
 * @remarks
 * - If `globalDeps` is true, the function is available in components via `this[globalDepsNameOverride]()` in Options API
 *   or directly as `myDeps()` in `<script setup>`.
 * - Lazy initialization of services is handled by `createDepsProxy`.
 */
export function registerDeps<T extends AppDepsMap>(
  app: App,
  deps: T,
  options?: RegisterDepsOptions
) {
  // Provide dependencies via Vue DI system
  app.provide(DEPS_KEY, deps)

  if (options?.globalDeps) {
    const proxy = createDepsProxy(deps)
    const name = options.globalDepsNameOverride || "deps"
    // @ts-ignore dynamic property assignment
    app.config.globalProperties[name] = () => proxy
  }
}
