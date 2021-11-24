<template>
  <div :class="$style.wrapper">
    <table :class="$style.list" v-if="isNotEmpty">
      <thead>
        <tr>
          <th>#</th>
          <th>Description</th>
          <th>Date</th>
          <th>Amount</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in filteredItems" :key="item.id">
          <td>{{ item.id }}</td>
          <td>{{ item.description }}</td>
          <td>{{ item.date }}</td>
          <td>{{ item.amount }}</td>
        </tr>
      </tbody>
    </table>
    <custom-pagination
      v-if="numberPages > 1"
      :class="$style.pagination"
      :numberPages="numberPages"
      :displayedPages="5"
      @change-page="setCurrent"
    />
  </div>
</template>

<script>
import CustomPagination from './CustomPagination.vue';

export default {
  name: 'ListCosts',
  components: {
    CustomPagination,
  },
  props: {
    items: {
      type: Array,
      default: () => [],
      validator(items) {
        return items.every((item) => {
          if ('id' in item && 'date' in item && 'description' in item && 'amount' in item) {
            const idValid = typeof item.id === 'number';
            const dateValid = typeof item.date === 'string';
            const descriptionValid = typeof item.description === 'string';
            const amountValid = typeof item.amount === 'number';
            return idValid && dateValid && descriptionValid && amountValid;
          }
          return false;
        });
      },
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
    isNotEmpty() {
      if (this.items.length === 0) {
        return false;
      }
      return true;
    },
    numberPages() {
      return Math.ceil(this.items.length / this.itemsPerPage);
    },
    numberItems() {
      return this.items.length;
    },
    filteredItems() {
      const { currentPage, itemsPerPage, numberItems } = this;
      const start = currentPage * itemsPerPage;
      const end = start + itemsPerPage;
      if (end > numberItems) {
        return this.items.slice(start, numberItems);
      }
      return this.items.slice(start, end);
    },
  },
  methods: {
    setCurrent(page) {
      this.currentPage = page;
    },
  },
};
</script>

<style module lang="scss">
.wrapper {
  width: 100%;
  overflow-x: auto;
}
.list {
  width: 100%;
  font-size: 1.25rem;
  border-collapse: collapse;
  & thead {
    color: #fff;
    background-color: #2aa694;
  }
  & tbody {
    color: #2c3e50;
    & tr {
      border-bottom: 0.05em solid #c2c2c2;

      &:hover {
        background-color: lighten(#2aa694, 55%);
      }
    }
  }
  & th,
  td {
    padding: 0.5em;
    text-align: center;
  }
}
.pagination {
    border-top: none;
  }
</style>
