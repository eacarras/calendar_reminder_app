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
      <v-col class="calenday-container__days-number-container" v-for="dayNumber in getDaysOfTheWeek(row)" :key="dayNumber.calendarDay">
        <!-- TODO: REFACTOR THIS SECTION CREATING TWO DIFFERENT COMPONENTS -->
        <v-card
          :class="
            isFirstOrLastDay(dayNumber.calendarDay.split('-')[1])
              ? 'calenday-container__days-number-container-item card--not-radius'
              : 'calenday-container__days-number-container-item card--not-radius--disable-bg'
          "
          elevation="14"
          height="5.25rem"
        >
          <p
            :class="
              dayNumber.calendarDay.split('-').length === 3
                ? 'calenday-container__days-number-container-item__day text-color--disable'
                : isFirstOrLastDay(dayNumber.calendarDay.split('-')[1])
                  ? 'calenday-container__days-number-container-item__day'
                  : 'calenday-container__days-number-container-item__day text-color--blue'
            "
          >{{ dayNumber.calendarDay.split('-')[0] }}</p>
          <div class="calenday-container__days-number-container-item__reminders">
            <v-btn v-if="dayNumber.calendarDay.split('-').length < 3" @click="openModal(dayNumber.calendarDay)" small icon>
              <v-icon>mdi-playlist-plus</v-icon>
            </v-btn>
            <v-card
              class="reminder-card--style"
              @click="editReminder(reminder)"
              v-for="reminder in getCropReminders(dayNumber.remindersOfTheDay)"
              :key="reminder.title + reminder.hour"
              :color="reminder.color"
            >
              {{ getFinalReminderText(reminder.title) }}
            </v-card>
            <p class="cursor-dialog text--size" @click="openDialog(dayNumber.remindersOfTheDay)" v-if="dayNumber.remindersOfTheDay.length > 2">You have {{ dayNumber.remindersOfTheDay.length - 2 }} more reminders</p>
          </div>
        </v-card>
      </v-col>
    </v-row>
    <alert-reminder
      v-show="isAddingReminder"
      @close-modal="closeModal"
      :reminder="reminderSelected"
      :dayOfReminder="daySelected"
    ></alert-reminder>
    <alert-informative
      v-show="dialog"
      @close-modal="closeInformativeDialog"
      :dataDialog="dataDialog"
    ></alert-informative>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex';
import moment from 'moment';

import AlertReminder from '@/components/alert/AlertReminder.vue';
import AlertInformative from '@/components/alert/AlertInformative.vue';

export default {
  components: {
    AlertReminder,
    AlertInformative,
  },
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
      daySelected: 0,
      isAddingReminder: false,
      reminderSelected: null,
      dialog: false,
      dataDialog: '',
    };
  },
  computed: {
    ...mapGetters('reminder', {
      preSavedReminders: 'getReminders',
    })
  },
  watch: {
    preSavedReminders() {
      const newReminder = this.updateReminders();
      this.daysOfTheMonth = newReminder;
    },
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
        tmpArray.push(`${lastMonthDayNumber}-${this.days[day]}-d`);
      }

      this.daysOfTheMonth = [...tmpArray, ...this.daysWithNumber]
    }

    if(indexLastDay < 6) {
      let nextDayMonth = 1;
      for(let day = indexLastDay; day < 6; day++) {
        this.daysOfTheMonth.push(`${nextDayMonth++}-${this.days[day]}-d`);
      }
    }

    this.daysOfTheMonth = this.updateReminders();
    this.weeksNumber = this.daysOfTheMonth.length / 7;
  },
  methods: {
    getDaysOfTheWeek(weekNumber) {
      if (weekNumber === 1) return this.daysOfTheMonth.slice(0, 7);

      const firstIndexSlice = (weekNumber - 1) * 7
      return this.daysOfTheMonth.slice(firstIndexSlice, firstIndexSlice + 7);
    },
    openDialog(array) {
      this.dataDialog = array.slice(2, ).map(e => e.title).join('\n');
      this.dialog = true;
    },
    editReminder(reminderToEdit) {
      this.reminderSelected = reminderToEdit;
      this.isAddingReminder = true;
    },
    updateReminders() {
      return this.daysOfTheMonth.map(element => {
        const havePreSavedData = typeof element !== typeof '';
        const splitData = havePreSavedData ? element.calendarDay.split('-') : element.split('-');
        const calendarDay = parseInt(splitData[0]);
        const remindersOfTheDay = this.preSavedReminders.length ? this.preSavedReminders.reduce((acc, reminder) => {
          if (reminder.day === calendarDay && splitData.length < 3) acc.push(reminder);

          return acc;
        }, []) : [];

        return {
          calendarDay: havePreSavedData ? element.calendarDay : element,
          remindersOfTheDay,
        };
      });
    },
    isFirstOrLastDay(day) {
      return this.days.indexOf(day) > 0 && this.days.indexOf(day) < 6;
    },
    openModal(dayNumber) {
      this.daySelected = parseInt(dayNumber);
      this.isAddingReminder = true;
    },
    closeInformativeDialog(val) {
      this.dialog = val;
    },
    closeModal(val) {
      this.reminderSelected = null;
      this.isAddingReminder = val;
    },
    getCropReminders(arrayReminders) {
      return arrayReminders.length >  2 ? arrayReminders.slice(0, 2) : arrayReminders;
    },
    getFinalReminderText(reminderTitle) {
      return reminderTitle.length > 22 ? `${reminderTitle.substring(0, 20)} ..` : reminderTitle; 
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
.card--not-radius--disable-bg {
  border-radius: 0%;
  background-color: #D8D8D8;
}
.calenday-container__days-number-container {
  margin-top: .1rem;
}
.calenday-container__days-number-container-item {
  display: grid;
  grid-template-columns: 1.75rem 1fr;
  padding: 0 .25rem;
  font-size: 20px;
}
.text-color--blue {
  color: #3393FF;
}
.text-color--disable {
  color: #B0B0B0;
}
.calenday-container__days-number-container-item__day {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  font-size: 20px;
}
.calenday-container__days-number-container-item__reminders {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}
.reminder-card--style {
  font-size: 12px;
  padding: .15rem;
  cursor: pointer;
}
.cursor-dialog {
  cursor:pointer;
}
.text--size {
  font-size: 10px;
  padding-top: .15rem;
}
</style>