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
    <v-row v-for="row in 4" :key="row" no-gutters>
      <v-col class="calenday-container__days-number-container" v-for="dayNumber in days.length" :key="dayNumber">
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
export default {
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
      ]
    };
  },
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