<template>
  <nav :class="$style.pagination">
    <button :class="$style.button" @click="setPrevPage">
      <svg :class="$style.icon" viewBox="0 0 13 23" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M12.6998 3.7499L4.9498 11.4999L12.6998 19.2499L11.1498 22.3499L0.299805
          11.4999L11.1498 0.649902L12.6998 3.7499Z"
        />
      </svg>
    </button>
    <button
      :class="{ [$style.current]: isCurrentPage(button.number), [$style.button]: true }"
      v-for="button in displayedButtons"
      :key="button.number"
      @click="setPage(button.number)"
    >
      {{ button.number }}
    </button>
    <button :class="$style.button" @click="setNextPage">
      <svg :class="$style.icon" viewBox="0 0 13 23" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M12.6998 3.7499L4.9498 11.4999L12.6998 19.2499L11.1498 22.3499L0.299805
          11.4999L11.1498 0.649902L12.6998 3.7499Z"
          transform="rotate(180 6.5 11.5)"
        />
      </svg>
    </button>
  </nav>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex';

export default {
  name: 'CustomPagination',
  props: {
    buttonsDisplayedCount: {
      type: Number,
      required: true,
    },
  },
  computed: {
    ...mapState(['paymentsList', 'currentPageNumber']),
    ...mapGetters(['pageCount', 'isDataEmpty', 'isCurrentPage']),
    isScrolling() {
      const { buttonsDisplayedCount, pageCount } = this;
      return buttonsDisplayedCount < pageCount;
    },
    startScrolling() {
      return Math.round(this.buttonsDisplayedCount / 2);
    },
    endScrolling() {
      const { startScrolling, pageCount } = this;
      return pageCount - startScrolling + 1;
    },
    displayedButtons() {
      const {
        isScrolling,
        startScrolling,
        endScrolling,
        pageCount,
        buttonsDisplayedCount,
        currentPageNumber,
      } = this;
      const range = { start: 0, end: buttonsDisplayedCount };

      if (!isScrolling) {
        range.end = pageCount;
      } else if (currentPageNumber > startScrolling) {
        if (currentPageNumber < endScrolling) {
          range.start = currentPageNumber - startScrolling;
          range.end = range.start + buttonsDisplayedCount;
        } else {
          range.end = pageCount;
          range.start = range.end - buttonsDisplayedCount;
        }
      }
      return this.paymentsList.slice(range.start, range.end);
    },
  },
  methods: {
    ...mapMutations(['setCurrentPageNumber']),
    ...mapActions(['fetchData']),
    setPage(number) {
      const { fetchData, setCurrentPageNumber } = this;
      fetchData(number);
      setCurrentPageNumber(number);
    },
    setNextPage() {
      const { currentPageNumber, pageCount, setPage } = this;
      const nextPage = currentPageNumber < pageCount ? currentPageNumber + 1 : pageCount;
      setPage(nextPage);
    },
    setPrevPage() {
      const { currentPageNumber, setPage } = this;
      const prevPage = currentPageNumber > 1 ? currentPageNumber - 1 : 1;
      setPage(prevPage);
    },
  },
};
</script>

<style module lang="scss">
.pagination {
  display: flex;
  font-size: 1.25rem;
  justify-content: center;
  border: 0.05em solid #c2c2c2;
}
.button {
  display: flex;
  align-items: center;
  padding: 0.5em 0.6em;
  font-size: 1.125rem;
  color: #2c3e50;
  border: none;
  background-color: #fff;
  transition: color 0.2s;
  &:hover {
    color: #2aa694;
    & .icon {
      fill: #2aa694;
    }
  }
}
.icon {
  width: 0.45em;
  fill: #2c3e50;
  transition: fill 0.2s;
}
.current {
  color: #2aa694;
}
</style>
