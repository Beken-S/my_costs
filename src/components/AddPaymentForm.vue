<template>
<div>
  <form :class="$style.form" v-if="showPaymentForm">
    <select :class="$style.input" v-model="category">
      <option v-for="category in categoryList" :value="category" :key="category">
        {{ category }}
      </option>
    </select>
    <input :class="$style.input" type="text" placeholder="Payment amount" v-model.number="amount" />
    <input :class="$style.input" type="text" placeholder="Payment date" v-model="date" />
    <custom-button :class="$style.buttonAddCategory" @click="openCategoryForm">
      Add category
    </custom-button>
    <custom-button :class="$style.buttonAddPayment" @click="addPayment" add>Add</custom-button>
  </form>
  <add-category-form v-if="showCategoryForm" @close="closeCategoryForm" />
</div>
</template>

<script>
import {
  mapState,
  mapGetters,
  mapMutations,
  mapActions,
} from 'vuex';
import CustomButton from './CustomButton.vue';

export default {
  name: 'AddPaymentForm',
  components: {
    CustomButton,
    AddCategoryForm: () => import(
      /* webpackChunkName: "AddCategoryForm" */ './AddCategoryForm.vue'
    ),
  },
  data() {
    return {
      category: '',
      amount: null,
      date: '',
      showPaymentForm: true,
      showCategoryForm: false,
    };
  },
  computed: {
    ...mapState(['categoryList', 'itemsPerPage']),
    ...mapGetters(['pageCount', 'getPageByNumber']),
    currentDate() {
      const date = new Date();
      return date.toLocaleDateString();
    },
  },
  methods: {
    ...mapMutations(['addPageData', 'addPage', 'setCurrentPageNumber']),
    ...mapActions(['fetchData', 'fetchPageCount']),
    addPayment() {
      const {
        getPageByNumber,
        addPage,
        addPageData,
        fetchData,
        fetchPageCount,
      } = this;
      fetchPageCount()
        .then((lastPageNumber) => fetchData(lastPageNumber))
        .then(() => {
          const {
            itemsPerPage,
            pageCount,
            category,
            amount,
            date,
            currentDate,
          } = this;
          const lastPage = getPageByNumber(pageCount);
          const dataLength = lastPage.data.length;
          const lastItemId = lastPage.data[dataLength - 1].id;
          const data = {
            id: lastItemId + 1,
            category,
            amount: Number(amount),
            date: date || currentDate,
          };
          if (dataLength < itemsPerPage) {
            addPageData({ number: pageCount, data });
          } else {
            addPage({ number: pageCount + 1, data: [data] });
          }
          return this.$router.push(
            {
              name: 'addPayment',
              params: { page: this.pageCount, category },
              query: { value: amount },
            },
          ).catch(() => {});
        });
    },
    openCategoryForm() {
      this.showPaymentForm = false;
      this.showCategoryForm = true;
    },
    closeCategoryForm() {
      this.showPaymentForm = true;
      this.showCategoryForm = false;
    },
  },
  mounted() {
    const { $route: { name, params: { category }, query: { value } } } = this;
    if (name === 'addPayment') {
      if (category) {
        this.category = category;
      }
      if (value) {
        this.amount = value;
      }
      this.date = this.currentDate;
      if (category && value) {
        this.addPayment();
      }
    }
  },
};
</script>

<style module lang="scss">
.form {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.25rem;
}
.input {
  grid-column: 1/3;
  padding: 0.5em 1em;
  font-size: 1.25rem;
  color: #2c3e50;
  border: 1px solid #c2c2c2;
  border-radius: 0.5em;
  background-color: #fff;
  &:focus {
    border: 1px solid #2aa694;
    outline: 1px solid #2aa694;
  }
}
.buttonAddCategory {
  grid-column: 1/2;
}
.buttonAddPayment {
  grid-column: 2/3;
}
</style>
