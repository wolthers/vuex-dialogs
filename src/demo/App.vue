<template>
  <div id="app">
    <Dialog 
      class="app__dialog" 
      :button="ExampleButton"
      :alert="ExampleContent"
      :confirm="ExampleContent"
      :prompt="ExampleContent"
    >
    </Dialog>
    <ExampleButton @click.native="handleShowAlertClick">dispatch('dialog/ALERT', ...) <small v-if="alertResolved !== null">Resolved value: undefined</small></ExampleButton><br>
    <ExampleButton @click.native="handleShowConfirmClick">dispatch('dialog/CONFIRM', ...) <small v-if="confirmResult !== null">Resolved value: {{ confirmResult}}</small></ExampleButton><br>
    <ExampleButton @click.native="handleShowPromptClick">dispatch('dialog/PROMPT', ...) <small v-if="promptResult !== null">Resolved value: {{ promptResult}}</small></ExampleButton>
  </div>
</template>

<script>
import { Dialog } from "../library";
import ExampleButton from "./components/ExampleButton";
import ExampleContent from "./components/ExampleContent";

export default {
  data() {
    return {
      ExampleContent,
      ExampleButton,
      promptResult: null,
      confirmResult: null,
      alertResolved: null
    };
  },
  components: {
    Dialog,
    ExampleButton
  },
  methods: {
    async handleShowAlertClick() {
      const result = await this.$store.dispatch("dialog/ALERT", {
        props: {
          heading: "Heading",
          body: "Incididunt veniam exercitation aliquip officia duis consequat."
        }
      });
      this.alertResolved = true;
      console.log("Alert closed with result", result); // eslint-disable-line
    },

    async handleShowConfirmClick() {
      const didConfirm = await this.$store.dispatch("dialog/CONFIRM", {
        props: {
          heading: "Heading",
          body: "Incididunt veniam exercitation aliquip officia duis consequat."
        }
      });
      this.confirmResult = didConfirm;
      console.log("Confirm closed with result", didConfirm); // eslint-disable-line
    },

    async handleShowPromptClick() {
      const prompt = await this.$store.dispatch("dialog/PROMPT", {
        props: {
          heading: "Heading",
          body:
            "Incididunt veniam exercitation aliquip officia duis consequat.",
          placeholder: "Example placeholder..."
        }
      });
      this.promptResult = JSON.stringify(prompt);
      console.log("Prompt closed with result", this.promptResult); // eslint-disable-line
    }
  }
};
</script>

<style>
body {
  font-family: "Arial", Times, serif;
  line-height: 1.5;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  margin: 0;
  padding: 20px 0;
}
.app__dialog {
  font-size: 16px;

  --vuex-dialogs-border-radius: 6px;
  --vuex-dialogs-min-width: 280px;
  --vuex-dialogs-max-width: 340px;
  --vuex-dialogs-margin: 20px;
  --vuex-dialogs-box-shadow: 0 1px 0 hsla(0, 0%, 100%, 0.05),
    0 -1px 0 hsla(0, 0%, 100%, 0.05), 1px 0 0 hsla(0, 0%, 100%, 0.05),
    -1px 0 0 hsla(0, 0%, 100%, 0.05), 0 0 25px hsla(0, 0%, 0%, 0.15);
  --vuex-dialogs-background-content: #f1f1f1;
  --vuex-dialogs-background-buttons: transparent;
  --vuex-dialogs-background-buttons-separator: hsla(0, 0%, 100%, 0.025);
  --vuex-dialogs-background-backdrop: hsla(193, 9%, 14%, 0.85);
  --vuex-dialogs-transform-enter: scale(1.25);
  --vuex-dialogs-transition-duration-leave: 250ms;
  --vuex-dialogs-transition-duration-enter: 400ms;
  --vuex-dialogs-transition-timing-function-enter: cubic-bezier(
    0.075,
    0.82,
    0.165,
    1
  );
}
</style>
