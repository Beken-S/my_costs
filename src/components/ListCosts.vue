<template>
  <div :class="$style.wrapper">
    <table :class="$style.list" v-if="isNotEmpty">
      <thead>
        <tr>
          <th>#</th>
          <th>Date</th>
          <th>Description</th>
          <th>Amount</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in items" :key="index">
          <td>{{ index + 1 }}</td>
          <td>{{ item.description }}</td>
          <td>{{ item.date }}</td>
          <td>{{ item.amount }}</td>
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
          if ('date' in item && 'description' in item && 'amount' in item) {
            const dateValid = typeof item.date === 'string';
            const descriptionValid = typeof item.description === 'string';
            const amountValid = typeof item.amount === 'number';
            return dateValid && descriptionValid && amountValid;
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
</style>
