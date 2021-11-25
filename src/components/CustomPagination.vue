<template>
  <nav :class="$style.pagination">
    <button :class="$style.button" @click="prevPage">
      <svg
        :class="$style.icon"
        viewBox="0 0 13 23"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12.6998 3.7499L4.9498 11.4999L12.6998 19.2499L11.1498 22.3499L0.299805
          11.4999L11.1498 0.649902L12.6998 3.7499Z"
        />
      </svg>
    </button>
    <button
      :class="{[$style.current]:button.current, [$style.button]: true}"
      v-for="button in displayedButtons"
      :key="button.page"
      @click="setCurrentPage(button.page)"
    >
      {{ button.page + 1 }}
    </button>
    <button :class="$style.button" @click="nextPage">
      <svg
        :class="$style.icon"
        viewBox="0 0 13 23"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12.6998 3.7499L4.9498 11.4999L12.6998 19.2499L11.1498 22.3499L0.299805
          11.4999L11.1498 0.649902L12.6998 3.7499Z" transform="rotate(180 6.5 11.5)"
        />
      </svg>
    </button>
  </nav>
</template>

<script>
export default {
  name: 'CustomPagination',
  props: {
    numberButtonsDisplayed: {
      type: Number,
      required: true,
    },
    numberItems: {
      type: Number,
      required: true,
    },
    itemsPerPage: {
      type: Number,
      default: 5,
    },
  },
  data() {
    return {
      currentPage: 0,
    };
  },
  computed: {
    numberPages() {
      const { numberItems, itemsPerPage } = this;
      return Math.ceil(numberItems / itemsPerPage);
    },
    pageRange() {
      const { currentPage, itemsPerPage, numberItems } = this;
      const start = currentPage * itemsPerPage;
      const end = start + itemsPerPage;
      return { start, end: end > numberItems ? numberItems : end };
    },
    pageButtons() {
      const { numberPages, currentPage } = this;
      const buttons = [];
      for (let i = 0; i < numberPages; i += 1) {
        buttons[i] = {
          page: i,
          current: currentPage === i,
        };
      }
      return buttons;
    },
    isScrolling() {
      const { numberButtonsDisplayed, numberPages } = this;
      return numberButtonsDisplayed < numberPages;
    },
    startScrolling() {
      return Math.round(this.numberButtonsDisplayed / 2) - 1;
    },
    endScrolling() {
      const { startScrolling, numberPages } = this;
      return numberPages - startScrolling;
    },
    displayedButtons() {
      const {
        isScrolling, startScrolling, endScrolling, numberPages, numberButtonsDisplayed, currentPage,
      } = this;
      const range = { start: 0, end: numberButtonsDisplayed };

      if (!isScrolling) {
        range.end = numberPages;
      } else if (currentPage > startScrolling) {
        if (currentPage < endScrolling) {
          range.start = currentPage - startScrolling;
          range.end = range.start + numberButtonsDisplayed;
        } else {
          range.end = numberPages;
          range.start = range.end - numberButtonsDisplayed;
        }
      }
      return this.pageButtons.slice(range.start, range.end);
    },
  },
  methods: {
    nextPage() {
      const { currentPage: current, numberPages, pageButtons } = this;
      const end = numberPages - 1;
      if (current < end) {
        const next = current + 1;
        pageButtons[current].current = false;
        pageButtons[next].current = true;
        this.currentPage = next;
        this.$emit('change-page', this.pageRange);
      }
    },
    prevPage() {
      const { currentPage: current, pageButtons } = this;
      if (current > 0) {
        const prev = current - 1;
        pageButtons[current].current = false;
        pageButtons[prev].current = true;
        this.currentPage = prev;
        this.$emit('change-page', this.pageRange);
      }
    },
    setCurrentPage(page) {
      const { numberPages: end, currentPage: current, pageButtons } = this;
      if (page >= 0 && page <= end) {
        pageButtons[current].current = false;
        pageButtons[page].current = true;
        this.currentPage = page;
        this.$emit('change-page', this.pageRange);
      }
    },
  },
  mounted() {
    this.$emit('change-page', this.pageRange);
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
    display:flex;
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
