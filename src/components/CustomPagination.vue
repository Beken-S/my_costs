<template>
  <nav :class="$style.pagination">
    <button :class="$style.button" @click="prevPage">
      <svg
        :class="$style.icon"
        width="0.6em"
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
      :class="{[$style.current]:page.current, [$style.button]: true}"
      v-for="page in range"
      :key="page.id"
      @click="setCurrentPage(page.id)"
    >
      {{ page.id + 1 }}
    </button>
    <button :class="$style.button" @click="nextPage">
      <svg
        :class="$style.icon"
        width="0.6em"
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
    displayedPages: {
      type: Number,
      required: true,
    },
    numberPages: {
      type: Number,
      default: 1,
    },
  },
  data() {
    return {
      currentPage: 0,
    };
  },
  computed: {
    pages() {
      const { numberPages, currentPage } = this;
      const pages = [];
      for (let i = 0; i < numberPages; i += 1) {
        pages[i] = {
          id: i,
          current: currentPage === i,
        };
      }
      return pages;
    },
    isScrolling() {
      const { displayedPages, numberPages } = this;
      return displayedPages < numberPages;
    },
    startScrolling() {
      return Math.round(this.displayedPages / 2) - 1;
    },
    endScrolling() {
      const { startScrolling, numberPages } = this;
      return numberPages - startScrolling;
    },
    range() {
      const {
        isScrolling, startScrolling, endScrolling, numberPages, displayedPages, currentPage,
      } = this;
      const range = { start: 0, end: displayedPages };

      if (!isScrolling) {
        range.end = numberPages;
      } else if (currentPage > startScrolling) {
        if (currentPage < endScrolling) {
          range.start = currentPage - startScrolling;
          range.end = range.start + displayedPages;
        } else {
          range.end = numberPages;
          range.start = range.end - displayedPages;
        }
      }
      return this.pages.slice(range.start, range.end);
    },
  },
  methods: {
    nextPage() {
      const { currentPage: pos, numberPages, pages } = this;
      const end = numberPages - 1;
      if (pos < end) {
        const page = pos + 1;
        pages[pos].current = false;
        pages[page].current = true;
        this.currentPage = page;
        this.$emit('change-page', page);
      }
    },
    prevPage() {
      const { currentPage: pos, pages } = this;
      if (pos > 0) {
        const page = pos - 1;
        pages[pos].current = false;
        pages[page].current = true;
        this.currentPage = page;
        this.$emit('change-page', page);
      }
    },
    setCurrentPage(page) {
      const { numberPages: end, currentPage: pos, pages } = this;
      if (page >= 0 && page <= end) {
        pages[pos].current = false;
        pages[page].current = true;
        this.currentPage = page;
        this.$emit('change-page', page);
      }
    },
  },
};
</script>

<style module lang="scss">
  .pagination {
    display: flex;
    justify-content: center;
    border: 1px solid #c2c2c2;
  }
  .button {
    display:flex;
    align-items: center;
    padding: 0.5em 0.6em;
    font-size: 1.1rem;
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
    fill: #2c3e50;
    transition: fill 0.2s;
  }
  .current {
    color: #2aa694;
  }
</style>
