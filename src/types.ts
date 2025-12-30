import type { App } from "vue"

export type ServiceFactory<T> = () => T

export type AppDepsMap = Record<string, any>

export interface DepsPluginOptions<T extends AppDepsMap = AppDepsMap> {
  app: App
  deps: T | Record<keyof T, ServiceFactory<T[keyof T]>>
}
