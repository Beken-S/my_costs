<template>
  <form :class="$style.form">
    <select :class="$style.input" v-model="category">
      <option v-for="category in categoryList" :value="category" :key="category">
        {{ category }}
      </option>
    </select>
    <input :class="$style.input" type="text" placeholder="Payment amount" v-model.number="amount" />
    <input :class="$style.input" type="text" placeholder="Payment date" v-model="date" />
    <custom-button :class="$style.button" @click="addPayment" add>Add</custom-button>
  </form>
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
  data() {
    return {
      category: '',
      amount: null,
      date: '',
    };
  },
  computed: {
    ...mapState(['categoryList']),
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
          if (dataLength < 5) {
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
  },
  components: {
    CustomButton,
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
  flex: 1 1 auto;
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
  background-color: #fff;
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
