<template>
  <button :class="$style.main" type="button" @click="$emit('click')">
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'CustomButton',
};
</script>

<style module lang="scss">
.main {
  padding: 0.625em;
  font-size: 1.25rem;
  text-transform: uppercase;
  color: white;
  border: 0.125em solid #2aa694;
  border-radius: 0.5em;
  background-color: #2aa694;
  box-shadow: 0 0.125em 0.25em rgba(0, 0, 0, 0.2);
  transition: color 0.2s, background-color 0.2s, box-shadow 0.2s, transform 0.2s;
  &:hover {
    color: #2aa694;
    cursor: pointer;
    background-color: #fff;
    box-shadow: 0 0.25em 0.5em rgba(0, 0, 0, 0.2);
    transform: translateY(-2px);
  }
  &:active {
    box-shadow: 0 0.125em 0.25em rgba(0, 0, 0, 0.2);
    transform: translateY(-1px);
  }
}
</style>
