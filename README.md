vuex-dialogs
====
Vuex powered alert-, confirm- and prompt-dialogs with a promise based interface similar to their respective DOM apis.


API
-------------
Show a confirm:
```javascript
const didConfirm = await this.$store.dispatch('dialog/CONFIRM', {
    props: { ... }
})
console.log(didConfirm) // true | false
```
Show a prompt:
```javascript
const formData = await this.$store.dispatch('dialog/PROMPT', {
    props: { ... }
})
console.log(formData) // { 'input-name-1': value, ... } | null
```
Show an alert:
```javascript
await this.$store.dispatch('dialog/ALERT', {
    props: { ... }
})
```
Hide any existing dialogs (equivalent of pressing cancel):
```javascript
await this.$store.dispatch('dialog/HIDE')
```

Installation
-------------
The library consists of two parts. A wrapping Dialog component and a vuex module. You create the inner content and button components yourself to allow maximum customizability.

**1. Install the library**
```bash
$ npm install --save vuex-dialogs
```

**2. Add the module to your vuex store**
```javascript
import { module as dialog } from 'vuex-dialogs'

new Vuex.Store({
  modules: {
    dialog
  },
  ...
})
```
**3. Create a component that will be used as the inner content.**
```html
// MyDialogContent.vue
<template>
  <div>
    <h2>{{heading}}</h2>
    <p>{{body}}</p>
    <input v-if="type === 'prompt'" required name="input-name-1" />
  </div>
</template>

<script>
export default {
  props: {
    type: String, // Passed automatically
    heading: String,
    body: String
  }
}
</script>
```
**4. Create or pass an existing button component that adheres to the following interface:**
```html
// MyButton.vue
<template>
  <button :disabled="loading || disabled">
    <slot></slot>
  </button>
</template>

<script>
export default {
  props: {
    disabled: Boolean, // Passed automatically when using asyncValidator on prompts
    loading: Boolean // Passed automatically when using asyncValidator on prompts
  }
}
</script>
```

**5. Add the wrapping component to your app**
<!-- -->
```html
// App.vue
<template>
  <main id="app">
    <Dialog :button="MyButton" :alert="MyDialogContent" :confirm="MyDialogContent" :prompt="MyDialogContent" />
  </main>
</template>

<script>
  import { Dialog } from 'vuex-dialogs'
  import MyButton from './path/to/MyButton'
  import MyDialogContent from './path/to/MyDialogContent'

  export default {
    data() {
      return { MyDialogContent, MyButton }
    },
    components: {
      Dialog
    }
  }
</script>
```