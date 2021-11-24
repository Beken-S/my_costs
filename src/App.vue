<template>
  <div id="app" class="wrapper">
    <div class="wrapper__content">
      <div class="container">
        <div class="content">
          <custom-button class="button" @click="showForm" add> Add new costs </custom-button>
          <add-payment-form class="form" v-if="formVisible" @add-payment="addPayment" />
          <list-costs class="list" :items="listCosts" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CustomButton from './components/CustomButton.vue';
import ListCosts from './components/ListCosts.vue';
import AddPaymentForm from './components/AddPaymentForm.vue';

export default {
  name: 'App',
  data() {
    return {
      formVisible: false,
      listCosts: [],
    };
  },
  components: {
    AddPaymentForm,
    ListCosts,
    CustomButton,
  },
  methods: {
    fetchData() {
      return [
        {
          id: 1,
          date: '28.03.2020',
          description: 'Food',
          amount: 169,
        },
        {
          id: 2,
          date: '24.03.2020',
          description: 'Transport',
          amount: 360,
        },
        {
          id: 3,
          date: '24.03.2020',
          description: 'Food',
          amount: 532,
        },
        {
          id: 4,
          date: '24.03.2020',
          description: 'Food',
          amount: 532,
        },
        {
          id: 5,
          date: '24.03.2020',
          description: 'Food',
          amount: 532,
        },
      ];
    },
    addPayment(data) {
      const payment = { id: this.listCosts.length + 1, ...data };
      this.listCosts.push(payment);
    },
    showForm() {
      this.formVisible = !this.formVisible;
    },
  },
  created() {
    this.listCosts = this.fetchData();
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
.wrapper {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  &__header {
    flex: 0 0 auto;
  }
  &__content {
    flex: 1 1 auto;
  }
  &__footer {
    flex: 0 0 auto;
  }
}
.container {
  max-width: 1140px;
  margin-left: auto;
  margin-right: auto;
  padding-left: 16px;
  padding-right: 16px;
}
.header {
  background-color: #686868;
  min-height: 75px;
}
.content {
  display: grid;
  grid-template-columns: repeat(2, 50%);
  grid-template-rows: auto;
  gap: 40px;
}
.footer {
  min-height: 75px;
  background-color: #686868;
}
.form {
  grid-column: 1;
}
.list {
  grid-column: 1;
}
.button {
  min-width: 230px;
  justify-self: flex-start;
  grid-column: 1;
}
</style>
