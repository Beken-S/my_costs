<template>
  <form :class="$style.form">
    <input
      :class="$style.input"
      type="text"
      placeholder="Payment description"
      v-model="description"
    />
    <input :class="$style.input" type="text" placeholder="Payment amount" v-model.number="amount" />
    <input :class="$style.input" type="text" placeholder="Payment date" v-model="date" />
    <custom-button :class="$style.button" @click="addPayment" add>Add</custom-button>
  </form>
</template>

<script>
import CustomButton from './CustomButton.vue';

export default {
  name: 'AddPaymentForm',
  data() {
    return {
      description: '',
      amount: null,
      date: '',
    };
  },
  computed: {
    currentDate() {
      const date = new Date();
      return date.toLocaleDateString();
    },
  },
  methods: {
    addPayment() {
      const { description, amount, date } = this;
      const data = {
        description,
        amount: Number(amount),
        date: date || this.currentDate,
      };
      this.$emit('add-payment', data);
    },
  },
  components: {
    CustomButton,
  },
};
</script>

<style module lang="scss">
.form {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}
.input {
  padding: 0.5em 1em;
  font-size: 1.25rem;
  color: #2c3e50;
  border: 1px solid #c2c2c2;
  border-radius: 0.5em;
  &:focus {
    border: 1px solid #2aa694;
    outline: 1px solid #2aa694;
  }
}
.button {
  align-self: flex-end;
  max-width: 150px;
}
</style>
