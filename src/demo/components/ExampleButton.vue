<template>
  <button 
    :disabled="loading || disabled" 
    class="example-button" 
    :class="{ 'example-button--loading': loading }"
  >
    <slot></slot>
  </button>
</template>

<script>
export default {
  props: {
    disabled: Boolean,
    loading: Boolean
  }
};
</script>

<style lang="scss">
.example-button {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 100%;
  max-width: calc(100vw - 40px);
  height: 60px;
  line-height: 1.3;
  padding: 0 15px;
  border: none;
  border-radius: 6px;
  font-family: inherit;
  font-size: 1.125em;
  color: #fff;
  transition: all 0.2s ease;
  background-color: #364042;
  cursor: pointer;

  &:focus {
    outline: none;
  }
  &:focus:not(:active):not(:hover) {
    background-color: lighten(#364042, 4.5%);
  }
  &:active {
    background-color: darken(#364042, 3%);
  }
  &:hover:not(:active) {
    background-color: lighten(#364042, 1.5%);
  }
  &--loading {
    background-image: url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz48c3ZnIHdpZHRoPScyNHB4JyBoZWlnaHQ9JzI0cHgnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgdmlld0JveD0iMCAwIDEwMCAxMDAiIHByZXNlcnZlQXNwZWN0UmF0aW89InhNaWRZTWlkIiBjbGFzcz0idWlsLXJpbmciPjxyZWN0IHg9IjAiIHk9IjAiIHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiBmaWxsPSJub25lIiBjbGFzcz0iYmsiPjwvcmVjdD48Y2lyY2xlIGN4PSI1MCIgY3k9IjUwIiByPSI0MCIgc3Ryb2tlLWRhc2hhcnJheT0iMTYzLjM2MjgxNzk4NjY2OTI2IDg3Ljk2NDU5NDMwMDUxNDIiIHN0cm9rZT0iI2ZmZmZmZiIgZmlsbD0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIyMCI+PGFuaW1hdGVUcmFuc2Zvcm0gYXR0cmlidXRlTmFtZT0idHJhbnNmb3JtIiB0eXBlPSJyb3RhdGUiIHZhbHVlcz0iMCA1MCA1MDsxODAgNTAgNTA7MzYwIDUwIDUwOyIga2V5VGltZXM9IjA7MC41OzEiIGR1cj0iMXMiIHJlcGVhdENvdW50PSJpbmRlZmluaXRlIiBiZWdpbj0iMHMiPjwvYW5pbWF0ZVRyYW5zZm9ybT48L2NpcmNsZT48L3N2Zz4K");
    background-repeat: no-repeat;
    background-position: center center;
    color: rgba(#364042, 0.25);
  }
  &[disabled],
  form[disabled] & {
    opacity: 0.25;
    cursor: not-allowed;
  }
  small {
    display: block;
    color: #aaa;
    font-size: 0.75em;
  }
}
</style>
