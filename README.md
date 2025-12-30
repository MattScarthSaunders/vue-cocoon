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
import { getDeps } from "@cocoon"

// Automatically inferred
const { userService, authService } = getDeps()

userService.login()
authService.logout()
</script>

```


