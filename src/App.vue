<template>
  <div id="app" class="wrapper">
    <div class="wrapper__content">
      <div class="container">
        <div class="content">
          <custom-button class="button" @click="changeFormVisibility" add>
            Add new costs
          </custom-button>
          <div class="form form-wrapper" v-if="isFormVisible">
            <add-payment-form v-if="isAddPaymentVisible" />
            <custom-button v-if="isAddPaymentVisible" @click="switchForm">
              Add category
            </custom-button>
            <add-category-form v-if="isAddCategoryVisible" @close="switchForm" />
          </div>
          <payments-list class="list" :items="currentPageData" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex';
import CustomButton from './components/CustomButton.vue';
import PaymentsList from './components/PaymentsList.vue';
import AddPaymentForm from './components/AddPaymentForm.vue';
import AddCategoryForm from './components/AddCategoryForm.vue';

export default {
  name: 'App',
  data() {
    return {
      isFormVisible: false,
      isAddPaymentVisible: true,
      isAddCategoryVisible: false,
    };
  },
  computed: {
    ...mapGetters(['pageCount', 'currentPageData']),
  },
  components: {
    AddPaymentForm,
    PaymentsList,
    CustomButton,
    AddCategoryForm,
  },
  methods: {
    ...mapMutations(['setCurrentPageNumber', 'addPage']),
    ...mapActions(['fetchPages', 'fetchData', 'fetchCategory']),
    changeFormVisibility() {
      this.isFormVisible = !this.isFormVisible;
    },
    switchForm() {
      this.isAddPaymentVisible = !this.isAddPaymentVisible;
      this.isAddCategoryVisible = !this.isAddCategoryVisible;
    },
  },
  created() {
    this.fetchPages()
      .then(() => (this.pageCount > 0 ? this.fetchData(1) : this.addPage({ number: 1, data: [] })))
      .then(() => this.setCurrentPageNumber(1));
    this.fetchCategory();
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
.form-wrapper {
  display: flex;
  align-items: flex-start;
  gap: 1.25rem;
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
