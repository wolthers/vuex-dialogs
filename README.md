vuex-dialogs
====
Vuex powered alert-, confirm- and prompt-dialogs with a promise based interface similar to their respective DOM apis.

Demo
-------------
Demo: <a href="https://p83q70qpm.codesandbox.io/" target="_blank">https://p83q70qpm.codesandbox.io</a> <br>
Demo source: <a href="https://codesandbox.io/s/p83q70qpm/" target="_blank">https://codesandbox.io/s/p83q70qpm</a>

API
-------------
#### Alert:
```javascript
await this.$store.dispatch('dialog/ALERT', {
    props: { ... }
})
```


#### Confirm:
```javascript
const didConfirm = await this.$store.dispatch('dialog/CONFIRM', {
    props: { ... }
})
console.log(didConfirm) // true | false
```


#### Prompt 
```javascript
const formData = await this.$store.dispatch('dialog/PROMPT', {
    props: { ... }
})
console.log(formData) // { 'name-attr-of-input': value, ... } | null
```

#### Prompt with validation
Sometimes you want to validate the given input before closing a prompt. To do so, you can define an asyncValidator(formValues), which receives an object with name-of-input/value-of-input pairs for the inputs in the form. `loading="true"` will automatically be set on the ok button until the promise has resolved:
```javascript
const asyncResult = await this.$store.dispatch('dialog/PROMPT', {
  props: {
    asyncValidator: async formValues => {
      const value = formValues['name-attr-of-input'] // "Something"
      const didValidate = await validateValueServerSide(value)

      if (didValidate) {
        // Close and pass the result to the outer promise
        this.$store.dispatch('dialog/HIDE', didValidate)
      } else {
        // Inform the user that the given input did not validate
      }
    },
    ...
  }
})
console.log(asyncResult) // "Something"
```
#### Hide programatically - for instance on $route change
```javascript
{
  watch: {
    $route() {
      this.$store.dispatch('dialog/HIDE')
    }
  },
  ...
}
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
    <Dialog 
      class="app__dialog" 
      :button="MyButton" 
      :alert="MyDialogContent" 
      :confirm="MyDialogContent" 
      :prompt="MyDialogContent" 
    />
  </main>
</template>

<script>
  import { Dialog } from 'vuex-dialogs'
  import dialogStyles from '../node_modules/vuex-dialogs/dist/vuex-dialogs.css'
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
<style>
.app__dialog {
  font-size: 16px;

  /* Defaults: */
  --vuex-dialogs-border-radius: 6px;
  --vuex-dialogs-min-width: 280px;
  --vuex-dialogs-max-width: 340px;
  --vuex-dialogs-margin: 20px;
  --vuex-dialogs-box-shadow: 0 1px 0 hsla(0, 0%, 100%, 0.05),
                             0 -1px 0 hsla(0, 0%, 100%, 0.05), 
                             1px 0 0 hsla(0, 0%, 100%, 0.05),
                             -1px 0 0 hsla(0, 0%, 100%, 0.05), 
                             0 0 25px hsla(0, 0%, 0%, 0.15);
  --vuex-dialogs-background-content: #f1f1f1;
  --vuex-dialogs-background-buttons: transparent;
  --vuex-dialogs-background-buttons-separator: hsla(0, 0%, 100%, 0.025);
  --vuex-dialogs-background-backdrop: hsla(193, 9%, 14%, 0.85);
  --vuex-dialogs-transform-enter: scale(1.25);
  --vuex-dialogs-transition-duration-leave: 250ms;
  --vuex-dialogs-transition-duration-enter: 400ms;
  --vuex-dialogs-transition-timing-function-enter: cubic-bezier(0.075, 0.82, 0.165, 1);
  
}
</style>

```


Browser support
-------------
Works in all evergreen browsers and IE11, the only difference that the wrapping dialog will not be themeable with CSS custom properties.