<template>
  <div class="example-content">
    <h2 class="example-content__heading">{{heading}}</h2>
    <p class="example-content__body" v-if="body">{{body}}</p>
    <input 
      v-if="type === 'prompt'" 
      type="text" 
      class="example-content__input"
      name="name-attr-of-input"
      required
      :placeholder="placeholder" 
    />
  </div>
</template>

<script>
export default {
  props: {
    heading: {
      type: String,
      required: true
    },
    placeholder: String,
    body: String,
    type: String
  }
};
</script>

<style>
.example-content {
  padding: 25px 25px 25px;
}
.example-content__heading {
  margin: -3px 0 0;
  text-align: center;
  font-size: 1.25em;
  line-height: 1.1;
}
.example-content__body {
  margin: 6px 0 -6px;
  text-align: center;
  font-size: 0.875em;
}
.example-content__input {
  display: block;
  height: 60px;
  margin: 25px 0 0;
  padding: 0 15px;
  font-size: 1em;
  font-weight: 400;
  appearance: none;
  border: 2px solid #ccc;
  background-color: #f5f5f5;
  border-radius: 6px;
  width: 100%;
  box-sizing: border-box;
}
</style>
