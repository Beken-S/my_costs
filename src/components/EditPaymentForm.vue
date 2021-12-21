<template>
<v-card class="text-left pa-6">
  <v-card-title>
    <span class="text-h5">Edit payment</span>
  </v-card-title>
  <v-card-text>
    <v-container class="pa-0" fluid>
      <v-row>
        <v-col cols="12" xs="12" >
          <v-select v-model="category" label="Category" :items="categoryList" />
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
    <v-btn color="teal" text @click="edit">Ok</v-btn>
    <v-spacer />
    <v-btn color="teal" text @click="close">Cancel</v-btn>
  </v-card-actions>
</v-card>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex';

export default {
  name: 'EditPaymentForm',
  props: {
    id: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      category: '',
      amount: null,
      date: '',
    };
  },
  computed: {
    ...mapState(['categoryList']),
    ...mapGetters(['currentPageData']),
    editablePayment() {
      const { currentPageData, id } = this;
      return currentPageData.find((item) => item.id === id);
    },
    currentDate() {
      const date = new Date();
      return date.toLocaleDateString();
    },
  },
  methods: {
    ...mapActions(['editPayment']),
    initField() {
      const { editablePayment: { category, amount, date } } = this;
      this.category = category;
      this.amount = amount;
      this.date = date;
    },
    edit() {
      const {
        id,
        category,
        amount,
        date,
        currentDate,
        editPayment,
        close,
      } = this;
      const data = {
        id,
        category,
        amount: Number(amount),
        date: date || currentDate,
      };
      editPayment(data);
      close();
    },
    close() {
      this.$emit('close');
    },
  },
  created() {
    this.initField();
  },
};
</script>
