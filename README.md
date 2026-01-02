# Cocoon

**A lightweight DI wrapper for Vue 3**  

Cocoon provides a simple, TypeScript-friendly way to register and consume services in your Vue 3 app, with optional global access and lazy initialization. Works with both `<script setup>` and the Options API.

Full documentation available [here](https://mattscarthsaunders.github.io/vue-cocoon/)

---

## Features

- Easy dependency registration via `registerDeps()`  
- Lazy service instantiation  
- Optional global function access in components  
- Full TypeScript support and typing for injected services  
- Compatible with `<script setup>` and Options API  
- Clean DX with minimal boilerplate  

---

## Installation

```bash
npm install vue-cocoon
# or
yarn add vue-cocoon
```

### Minimal example

```
// main.ts
import { createApp } from "vue"
import App from "./App.vue"
import { registerDeps } from "@your-scope/vue-deps"
import { UserService, AuthService } from "./services"

const app = createApp(App)

// You can register instances
// Or factories for lazy instantiation
registerDeps(app, {
  userService: () => new UserService(),
  authService: () => new AuthService(),
})

app.mount("#app")

```

```
// component.vue
<script setup lang="ts">
import { deps } from "@cocoon"

const { userService, authService } = deps()

userService.login()
authService.logout()
</script>

```

