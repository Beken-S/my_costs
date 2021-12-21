<template>
<v-card class="text-left pa-6">
  <v-card-title>
    <span class="text-h5">Add payment</span>
  </v-card-title>
  <v-card-text>
    <v-container class="pa-0" fluid>
      <v-row>
        <v-col cols="12" xs="12" sm="8" >
          <v-select v-model="category" label="Category" :items="categoryList" />
        </v-col>
        <v-col class="d-flex" cols="12" xs="12" sm="4" align-self="center">
          <v-dialog v-model="dialog" max-width="500" persistent>
            <template v-slot:activator="{ on }">
              <v-btn class="flex-grow-1" color="teal" dark   v-on="on">
                Add category
              </v-btn>
            </template>
             <add-category-form @close="closeCategoryForm" />
          </v-dialog>
        </v-col>
        <v-col cols="12" xs="12" >
          <v-text-field v-model="date" label="Date" />
        </v-col>
        <v-col cols="12" xs="12" >
          <v-text-field v-model="amount" label="Amount" />
        </v-col>
      </v-row>
    </v-container>
  </v-card-text>
  <v-card-actions>
    <v-btn color="teal" text @click="add">Add</v-btn>
    <v-spacer />
    <v-btn color="teal" text @click="close">Close</v-btn>
  </v-card-actions>
</v-card>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex';
import AddCategoryForm from './AddCategoryForm.vue';

export default {
  name: 'AddPaymentForm',
  components: {
    AddCategoryForm,
  },
  data() {
    return {
      category: '',
      amount: null,
      date: '',
      dialog: false,
    };
  },
  computed: {
    ...mapState(['categoryList', 'pageCount']),
    currentDate() {
      const date = new Date();
      return date.toLocaleDateString();
    },
  },
  methods: {
    ...mapMutations(['setCurrentPageNumber']),
    ...mapActions(['addPayment', 'fetchPageCount', 'fetchPage']),
    add() {
      const {
        category,
        amount,
        date,
        currentDate,
        addPayment,
      } = this;
      const data = {
        date: date || currentDate,
        category,
        amount: Number(amount),
      };
      return addPayment(data)
        .then(() => {
          this.$router.push({
            name: 'addPayment',
            params: { page: this.pageCount, category },
            query: { value: amount },
          }).catch(() => {});
          this.reset();
        })
        .catch((err) => console.log(err));
    },
    reset() {
      this.category = '';
      this.amount = null;
      this.date = '';
    },
    close() {
      this.reset();
      this.$emit('close');
    },
    closeCategoryForm() {
      this.dialog = false;
    },
  },
  created() {
    const { $route: { name, params: { category }, query: { value } }, add, close } = this;
    if (name === 'addPayment') {
      if (category) {
        this.category = category;
      }
      if (value) {
        this.amount = value;
      }
      this.date = this.currentDate;
      if (category && value) {
        add().then(() => close());
      }
    }
  },
};
</script>
