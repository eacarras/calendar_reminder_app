<template>
  <v-container class="alert-container">
    <v-card class="alert-container__content" :style="backgroundColorAlert">
      <v-row class="title--color">
        <v-col cols="12"><h2>New Reminder</h2></v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-text-field
            v-model="title"
            class="btn--long-size"
            outlined
            label="Title"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col class="col--size" cols="8">
          <v-row>
            <v-col cols="12">
              <v-textarea
                v-model="description"
                label="Description"
                solo
                :rules="rules"
              ></v-textarea>
            </v-col>
            <v-col cols="6">
              <v-text-field
                v-model="hour"
                outlined
                label="Hour ej: 19:20"
              ></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field
                v-model="city"
                outlined
                label="City"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-col>
        <v-col class="row--padding" cols="4">
          <v-color-picker
            class="picker--size"
            v-model="color"
            hide-inputs
          ></v-color-picker>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="6">
          <v-btn
            @click="saveReminder"
            elevation="2"
            outlined
          >{{ this.reminder ? 'Edit' : 'Add' }}</v-btn>
        </v-col>
        <v-col cols="6">
          <v-btn
            @click="closeModal"
            elevation="2"
            outlined
          >Cancel</v-btn>
        </v-col>
      </v-row>
    </v-card>
    <!-- ALERT WHEN USER NOT ENTER DATA PROPERTY -->
    <v-snackbar
      v-model="snackbar"
      :timeout="timeout"
      top
      right
    >
      {{ snackbarText }}
      <template v-slot:action="{ attrs }">
        <v-btn
          color="pink"
          text
          v-bind="attrs"
          @click="snackbar = false"
        >
          Got it!
        </v-btn>
      </template>
    </v-snackbar>
  </v-container>
</template>

<script>
import moment from 'moment';

import Reminder from '@/models/Reminder.js';

export default {
  props: {
    dayOfReminder: {
      type: Number,
      required: true,
    },
    reminder: {
      type: Object,
      default: undefined,
    },
  },
  watch: {
    reminder() {
      if (this.reminder) {
        this.title = this.reminder.title,
        this.hour = this.reminder.hour,
        this.description = this.reminder.message,
        this.city = this.reminder.city ? this.reminder.city : '';
        this.color = this.reminder.color;
      }
    },
  },
  data() {
    return {
      rules: [
        value => !!value || 'Required',
        value => (value && value.length <= 30) || 'Max 30 characters'
      ],
      timeout: 2000,
      snackbar: false,
      snackbarText: '',
      color: '#FFF',
      title: '',
      hour: '',
      description: '',
      city: '',
    };
  },
  computed: {
    backgroundColorAlert() {
      return {
        '--background-color': this.color,
      };
    },
  },
  methods: {
    saveReminder() {
      if (!this.title.length)
        this.activeSnackBar('Ingrese un titulo para continuar');
      else if(!this.description.length || this.description.length > 30)
        this.activeSnackBar('Ingrese una descripcion para continuar');
      else if(this.hour.trim().split(':').length != 2)
        this.activeSnackBar('Ingrese una hora en el formato hh:mm para continuar');
      else {
        if (this.reminder) {
          this.$store.dispatch('reminder/removeReminder', this.reminder);
        }
        const reminder = new Reminder(
          this.title,
          this.description,
          this.dayOfReminder,
          moment().format('MM'), //TODO: IMPROVE THIS TO SUPPORT MORE THAN CURRENT MONTH
          new Date().getFullYear(),
          this.hour,
          this.city,
          this.color,
        );
        this.$store.dispatch('reminder/addRemminder', reminder);
        this.closeModal();
      }
    },
    activeSnackBar(message) {
      this.snackbarText = message;
      this.snackbar = true;
    },
    closeModal() {
      this.resetData();
      this.$emit('close-modal', false);
    },
    resetData() {
      this.title = '';
      this.hour = '';
      this.city = '';
      this.description = '';
      this.color = '#FFF';
    },
  }
}
</script>

<style scoped>
.alert-container {
  position: fixed;
  z-index: 2;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: auto;
  display: flex;
  justify-content: center;
  align-content: center;
  height: min-content;
  padding: 0 .5rem;
}
.alert-container__content {
  background-color: #D9EFC1;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.title--color {
  background-color: var(--background-color);
}
.picker--size {
  height: 90%;
}
.row--padding {
  padding-left: .5rem;
}
.row {
  width: 100%;
}
</style>
