<template>
  <v-container>
    <h1>{{ actualMonth }}</h1>
    <calendar></calendar>
  </v-container>
</template>

<script>
import moment from 'moment';

import Calendar from '@/components/calendar/Calendar.vue';

export default {
  components: {
    Calendar,
  },
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
