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
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex';
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
    ...mapActions(['fetchData']),
    addPayment() {
      const {
        category,
        amount,
        date,
        currentDate,
        getPageByNumber,
        addPage,
        addPageData,
        setCurrentPageNumber,
        fetchData,
      } = this;

      fetchData(this.pageCount).then(() => {
        const lastPage = getPageByNumber(this.pageCount);
        const dataLength = lastPage.data.length;
        const lastItemId = lastPage.data[dataLength - 1].id;
        const data = {
          id: lastItemId + 1,
          category,
          amount: Number(amount),
          date: date || currentDate,
        };

        if (dataLength === 5) {
          addPage({ number: this.pageCount + 1, data: [data] });
        } else {
          addPageData({ number: this.pageCount, data });
        }
        setCurrentPageNumber(this.pageCount);
      });
    },
  },
  components: {
    CustomButton,
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
