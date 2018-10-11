<template>
  <aside @keydown.esc="dismiss" class="vuex-dialog" :class="{ 'visible': visible }" tabindex="-1">
    <transition name="vuex-dialog__backdrop-">
      <div v-if="visible" class="vuex-dialog__backdrop"></div>
    </transition>
    <transition name="vuex-dialog__main-">
      <form v-if="visible" ref="form" class="vuex-dialog__main" @submit.prevent="handleSubmit">
        <fieldset class="vuex-dialog__content" :disabled="validating">
          <component :is="computedComponent" v-bind="componentProps" :type="componentType"></component>
        </fieldset>
        <div class="vuex-dialog__buttons">
          <template v-if="componentType === 'prompt' || componentType === 'confirm'">
            <component :is="button" :disabled="validating" class="vuex-dialog__button" type="button" @click.native="dismiss">
              {{ computedCancelLabel }}
            </component>
            <span class="vuex-dialog__buttons-separator"></span>
          </template>
          <component :is="button" :disabled="validating" :loading="validating" type="submit" class="vuex-dialog__button">
            {{ computedOkLabel }}
          </component>
        </div>
      </form>
    </transition>
  </aside>
</template>

<script>
import getFormData from "./utils/getFormData";

export default {
  props: {
    button: {
      type: Object,
      required: true
    },
    alert: {
      type: Object,
      required: true
    },
    confirm: {
      type: Object,
      required: true
    },
    prompt: {
      type: Object,
      required: true
    },
    okLabel: {
      type: String,
      default: "Ok"
    },
    cancelLabel: {
      type: String,
      default: "Cancel"
    },
    moduleName: {
      type: String,
      default: "dialog"
    }
  },
  data() {
    return {
      validating: false
    };
  },
  computed: {
    componentProps() {
      return this.module.componentProps;
    },
    componentType() {
      return this.module.componentType;
    },
    visible() {
      return this.module.visible && this.computedComponent;
    },
    module() {
      return this.$store.state[this.moduleName];
    },
    computedComponent() {
      if (this.module.customComponent) {
        return this.module.customComponent;
      } else if (this.componentType === "alert") {
        return this.alert;
      } else if (this.componentType === "confirm") {
        return this.confirm;
      } else if (this.componentType === "prompt") {
        return this.prompt;
      }
    },
    computedOkLabel() {
      return (this.componentProps && this.componentProps.ok) || this.okLabel;
    },
    computedCancelLabel() {
      return (
        (this.componentProps && this.componentProps.cancel) || this.cancelLabel
      );
    }
  },
  watch: {
    visible(visible) {
      if (visible) {
        this.$el.focus();
      }
    }
  },
  methods: {
    dismiss() {
      this.$store.dispatch("dialog/HIDE");
    },
    handleSubmit() {
      const okStrategy = {
        alert: undefined,
        confirm: true,
        prompt: {}
      };
      const payload = okStrategy[this.componentType];

      if (this.componentType === "prompt") {
        const formData = getFormData(this.$refs.form);

        formData.forEach(pair => {
          const [key, value] = pair;

          if (payload[key]) {
            payload[key] = [payload[key]];
          }

          if (payload[key] instanceof Array) {
            payload[key].push(value);
          } else {
            payload[key] = value;
          }
        });
      }

      // Only close if customValidationOnSubmit isn't set
      if (typeof this.componentProps.customValidator === "function") {
        this.validating = true;
        this.componentProps
          .customValidator(payload)
          .then(() => (this.validating = false))
          .catch(() => (this.validating = false));
      } else {
        this.$store.dispatch("dialog/HIDE", payload);
      }
    }
  }
};
</script>

<style lang="scss">
.vuex-dialog {
  $box-shadow: 0 1px 0 hsla(0, 0%, 100%, 0.05), 0 -1px 0 hsla(0, 0%, 100%, 0.05),
    1px 0 0 hsla(0, 0%, 100%, 0.05), -1px 0 0 hsla(0, 0%, 100%, 0.05),
    0 0 25px hsla(0, 0%, 0%, 0.15);
  $border-radius: 6px;
  $min-width: 280px;
  $max-width: 340px;
  $margin: 20px;
  $background-content: #f1f1f1;
  $background-buttons: transparent;
  $background-buttons-separator: hsla(0, 0%, 100%, 0.025);
  $background-backdrop: hsla(193, 9%, 14%, 0.85);
  $transform-enter: scale(1.25);
  $transition-duration-leave: 250ms;
  $transition-duration-enter: 400ms;
  $transition-timing-function-enter: cubic-bezier(
    0.075,
    0.82,
    0.165,
    1
  ); // EaseOutCirc

  pointer-events: none;
  position: fixed;
  height: 100vh;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  transform: translate3d(0, 0, 0);
  backface-visibility: hidden;
  overflow: hidden;
  pointer-events: auto;

  &:not(.visible) {
    pointer-events: none;
    transition: opacity $transition-duration-leave;
    transition-duration: var(
      --vuex-dialogs-transition-duration-leave,
      $transition-duration-leave
    );
    opacity: 0;
  }
  &__main {
    position: relative;
    overflow: hidden;
    width: 100%;
    border-radius: $border-radius;
    border-radius: var(--vuex-dialogs-border-radius, $border-radius);
    box-shadow: $box-shadow;
    box-shadow: var(--vuex-dialogs-box-shadow, $box-shadow);
    min-width: $min-width;
    min-width: var(--vuex-dialogs-min-width, $min-width);
    max-width: $max-width;
    max-width: var(--vuex-dialogs-max-width, $max-width);
    margin: $margin;
    margin: var(--vuex-dialogs-margin, $margin);

    &--enter-active {
      transition: transform $transition-duration-enter - 75ms
          $transition-timing-function-enter,
        opacity $transition-duration-enter - 100ms ease;
      transition-timing-function: var(
          --vuex-dialogs-transition-timing-function-enter,
          $transition-timing-function-enter
        ),
        ease;
      transition-duration: calc(
          var(
              --vuex-dialogs-transition-duration-enter,
              #{$transition-duration-enter}
            ) - 75ms
        ),
        calc(
          var(
              --vuex-dialogs-transition-duration-enter,
              #{$transition-duration-enter}
            ) - 100ms
        );
      transition-delay: 75ms, 75ms;
    }
    &--leave-active {
      transition-duration: $transition-duration-leave;
      transition-duration: var(
        --vuex-dialogs-transition-duration-leave,
        #{$transition-duration-leave}
      );
    }
    &--enter {
      transform: $transform-enter;
      transform: var(--vuex-dialogs-transform-enter, $transform-enter);
      opacity: 0;
    }
  }
  &__content {
    border: none;
    padding: 0;
    margin: 0;
    background: $background-content;
    background: var(--vuex-dialogs-background-content, $background-content);
  }
  &__buttons {
    display: flex;
    justify-content: stretch;
    align-items: stretch;
    background: $background-buttons;
    background: var(--vuex-dialogs-background-buttons, $background-buttons);
  }
  &__button {
    flex: 1 1;
    min-width: 0px !important;
    border-radius: 0 !important;
  }
  &__buttons-separator {
    flex: 0 0 1px;
    background: var(
      --vuex-dialogs-background-buttons-separator,
      $background-buttons-separator
    );
  }
  &__backdrop {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    transform: translate3d(0, 0, 0);
    backface-visibility: hidden;
    will-change: opacity;
    background: $background-backdrop;
    background: var(--vuex-dialogs-background-backdrop, $background-backdrop);

    &--enter-active {
      transition: opacity 325ms ease;
      transition: opacity $transition-duration-enter - 75ms ease;
      transition-duration: calc(
        var(
            --vuex-dialogs-transition-duration-enter,
            #{$transition-duration-enter}
          ) - 75ms
      );
    }
    &--leave-active {
      transition-duration: $transition-duration-leave;
      transition-duration: var(
        --vuex-dialogs-transition-duration-leave,
        $transition-duration-leave
      );
    }
    &--enter {
      opacity: 0;
    }
  }
}
</style>
