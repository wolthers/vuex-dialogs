vuex-dialogs
====
Vuex powered alert-, confirm- and prompt-dialogs with a promise based interface similar to their respective DOM apis.

Demo
-------------
https://codesandbox.io/s/p83q70qpm

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
console.log(formData) // { 'name-attr-of-input': value, ... } | null
```
Show an alert:
```javascript
await this.$store.dispatch('dialog/ALERT', {
    props: { ... }
})
```
Show a prompt with async validation (this will set loading: true on the button):
```javascript
const asyncResult = await this.$store.dispatch('dialog/PROMPT', {
  props: {
    ...
    asyncValidator: async formData => {
      const input = formData['name-attr-of-input']

      try {
        const asyncResult = await fetchSomethingAsync(input)
        this.$store.dispatch('dialog/HIDE', asyncResult)
      } catch (error) {
        // Handle error
        this.$store.dispatch('dialog/HIDE')
      }
    }
  }
})
console.log(asyncResult) // Something | null
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
    <input v-if="type === 'prompt'" required name="name-attr-of-input" />
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