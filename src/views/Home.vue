<template>
  <v-container>
    <h1>{{ actualMonth }}</h1>
    <calendar v-if="arrayDays.length" :daysWithNumber="arrayDays"></calendar>
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
      actualYear: new Date().getFullYear(),
      arrayDays: [],
    };
  },
  mounted() {
    this.actualMonth = moment().format('MMMM').toUpperCase();
    const startDate = moment(`${this.actualYear}-${this.actualMonth}`,"YYYY-MMMM");
    
    for(let end = moment(startDate).add(1,'month');  startDate.isBefore(end); startDate.add(1,'day')){
        this.arrayDays.push(startDate.format('D-dddd'));
    }
  },
}
</script>
