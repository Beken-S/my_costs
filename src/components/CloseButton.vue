<template>
  <button :class="$style.main" type="button" @click="$emit('close')">
    &#128939;
  </button>
</template>

<script>
export default {
  name: 'CloseButton',
};
</script>

<style module lang="scss">
.main {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 56px;
  padding: 0;
  font-size: 1.625rem;
  line-height: 0;
  border: none;
  background-color: transparent;
  color: #686868;
  transition: color 0.2s;
  &:hover {
    cursor: pointer;
    color: #2aa694;
  }
  &:active {
    color: #686868;
  }
}
</style>
