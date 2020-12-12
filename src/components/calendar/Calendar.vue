<template>
  <v-container class="calendar-container">
    <v-row no-gutters>
      <v-col v-for="day in days" :key="day">
        <v-card
          class="calenday-container__days card--not-radius"
          elevation="14"
          height="2rem"
        >{{ day }}</v-card>
      </v-col>
    </v-row>
    <v-row v-for="row in weeksNumber" :key="row" no-gutters>
      <v-col class="calenday-container__days-number-container" v-for="dayNumber in getDaysOfTheWeek(row)" :key="dayNumber">
        <v-card
          class="calenday-container__days-number-container-item card--not-radius"
          elevation="14"
          height="5.25rem"
        >{{ dayNumber }}</v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import moment from 'moment';

export default {
  props: {
    daysWithNumber: {
      type: Array,
      required: true,
    }
  },
  data() {
    return {
      days: [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',  
      ],
      daysOfTheMonth: this.daysWithNumber,
      weeksNumber: 0,
    };
  },
  mounted() {
    const indexFirstDay = this.days.indexOf(this.daysWithNumber[0].split('-')[1]);
    const indexLastDay = this.days.indexOf(this.daysWithNumber[this.daysWithNumber.length - 1].split('-')[1]);

    if(indexFirstDay > 0) {
      const lastMonthDays = parseInt(moment(moment().format('YYYY-MM-DD')).subtract(1,'months').endOf('month').format('DD'));
      let lastMonthDayNumber;
      const tmpArray = [];

      for(let day = 0; day < indexFirstDay; day++) {
        lastMonthDayNumber = lastMonthDays - (indexFirstDay - day - 1);
        tmpArray.push(`${lastMonthDayNumber}-${this.days[day]}`);
      }

      this.daysOfTheMonth = [...tmpArray, ...this.daysWithNumber]
    }

    if(indexLastDay < 6) {
      let nextDayMonth = 1;
      for(let day = indexLastDay; day < 6; day++) {
        this.daysOfTheMonth.push(`${nextDayMonth++}-${this.days[day]}`);
      }
    }

    this.daysOfTheMonth = this.daysOfTheMonth.map(element => element.split('-')[0]);
    this.weeksNumber = this.daysOfTheMonth.length / 7;
  },
  methods: {
    getDaysOfTheWeek(weekNumber) {
      if (weekNumber === 1) return this.daysOfTheMonth.slice(0, 7);

      const firstIndexSlice = (weekNumber - 1) * 7
      return this.daysOfTheMonth.slice(firstIndexSlice, firstIndexSlice + 7);
    }
  }
}
</script>

<style scoped>
.calendar-container {
  margin-top: .25rem;
}
.calenday-container__days{
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  background-color: #3393FF;
}
.card--not-radius {
  border-radius: 0%;
}
.calenday-container__days-number-container {
  margin-top: .1rem;
}
.calenday-container__days-number-container-item {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0 .25rem;
  font-size: 20px;
}
</style>