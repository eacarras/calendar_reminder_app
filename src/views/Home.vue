<template>
  <v-container>
    <h1>{{ actualMonth }}</h1>
  </v-container>
</template>

<script>
import moment from 'moment';

export default {
  data() {
    return {
      actualMonth: '',
    };
  },
  mounted() {
    this.actualMonth = moment().format('MMMM').toUpperCase();
  },
}
</script>
