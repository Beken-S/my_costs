<template>
  <button :class="$style.main" type="button" @click="$emit('click')">
    <slot></slot>
    <span v-if="add">+</span>
  </button>
</template>

<script>
export default {
  name: 'CustomButton',
  props: {
    add: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style module lang="scss">
.main {
  position: relative;
  display: flex;
  justify-content: space-between;
  padding: 0.625em;
  font-size: 1.25rem;
  line-height: 1.2;
  text-transform: uppercase;
  color: white;
  border: 0.125em solid #2aa694;
  border-radius: 0.5em;
  background-color: #2aa694;
  box-shadow: 0 0.125em 0.25em rgba(0, 0, 0, 0.2);
  transform: translateY(0);
  transition: color 0.2s, background-color 0.2s, box-shadow 0.2s, transform 0.2s;
  &:hover {
    color: #2aa694;
    cursor: pointer;
    background-color: #fff;
  }
  &:active {
    box-shadow: 0 0.075em 0.125em rgba(0, 0, 0, 0.2);
    transform: translateY(2px);
  }
}
</style>
