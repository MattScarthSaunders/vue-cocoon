/**
 * @packageDocumentation
 * @module cocoon
 *
 * Public API entry point for Cocoon: Vue 3 dependency injection system.
 *
 * Exposes only the public API:
 * - `registerDeps` — registers services in the app
 * - `deps` — retrieves services in components
 *
 * Internal helpers (e.g., `createDepsProxy`, `DEPS_KEY`) are not exposed.
 */

export { registerDeps, RegisterDepsOptions } from "./plugin"
export { deps } from "./helpers"
export type { AppDepsMap } from "./types"
