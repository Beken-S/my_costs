<template>
  <div :class="$style.listCostsWrapper">
    <table :class="$style.listCosts" v-if="isNotEmpty">
      <thead>
        <tr>
          <th>#</th>
          <th>Date</th>
          <th>Category</th>
          <th>Value</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in items" :key="index">
          <td>{{ index + 1 }}</td>
          <td>{{ item.date }}</td>
          <td>{{ item.category }}</td>
          <td>{{ item.value }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'ListCosts',
  props: {
    items: {
      type: Array,
      default: () => [],
      validator(items) {
        return items.every((item) => {
          if ('date' in item && 'category' in item && 'value' in item) {
            const dateValid = typeof item.date === 'string';
            const categoryValid = typeof item.category === 'string';
            const valueValid = typeof item.value === 'number';
            return dateValid && categoryValid && valueValid;
          }
          return false;
        });
      },
    },
  },
  computed: {
    isNotEmpty() {
      if (this.items.length === 0) {
        return false;
      }
      return true;
    },
  },
};
</script>

<style module lang="scss">
.listCostsWrapper {
  width: 100%;
  padding: 0 20px;
  overflow-x: auto;
}
.listCosts {
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
</style>
