import type { App } from "vue"
import { DEPS_KEY } from "./helpers"

export function registerDeps<T extends Record<string, any>>(app: App, deps: T) {
  app.provide(DEPS_KEY, deps)
}
