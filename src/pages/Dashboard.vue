<template>
  <div :class="$style.content">
    <custom-button :class="$style.button" @click="showForm" add>
      Add new costs
    </custom-button>
    <payments-list :class="$style.list" :items="currentPageData" />
  </div>
</template>

<script>
import {
  mapState,
  mapGetters,
  mapMutations,
  mapActions,
} from 'vuex';
import CustomButton from '../components/CustomButton.vue';
import PaymentsList from '../components/PaymentsList.vue';

export default {
  name: 'App',
  computed: {
    ...mapState(['currentPageNumber']),
    ...mapGetters(['pageCount', 'currentPageData']),
  },
  components: {
    PaymentsList,
    CustomButton,
  },
  methods: {
    ...mapMutations(['setCurrentPageNumber', 'addPage', 'initPages']),
    ...mapActions(['fetchPageCount', 'fetchData', 'fetchCategory']),
    showForm() {
      const settings = {
        name: 'AddPaymentForm',
      };
      this.$modal.show(settings);
    },
  },
  created() {
    this.fetchPageCount()
      .then((result) => {
        const { pageCount, initPages } = this;
        if (pageCount === 0) {
          initPages(result);
        }
      })
      .then(() => {
        const { pageCount, currentPageNumber, fetchData } = this;
        if (currentPageNumber > 0 && pageCount >= currentPageNumber) {
          fetchData(currentPageNumber);
        } else {
          this.$router.push({ name: 'dashboardPage', params: { page: 1 } });
        }
      });
    this.fetchCategory();
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      const { setCurrentPageNumber, showForm } = vm;
      const { params: { page }, name } = to;
      if (!Number.isNaN(page) && Number(page) > 0) {
        setCurrentPageNumber(Number(page));
      }
      if (name === 'addPayment') {
        showForm();
      }
    });
  },
  beforeRouteUpdate(to, from, next) {
    const { fetchData, setCurrentPageNumber } = this;
    const { params: { page } } = to;
    fetchData(Number(page));
    setCurrentPageNumber(Number(page));
    next();
  },
};
</script>

<style module lang="scss">
.content {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: auto;
  gap: 40px;
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
