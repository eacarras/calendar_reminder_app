<template>
  <v-container class="alert-container">
    <v-card class="alert-container__content">
      <v-row>
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
        <v-col cols="8">
          <v-textarea
            v-model="description"
            label="Description"
            solo
            :rules="rules"
          ></v-textarea>
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
          >Agregar</v-btn>
        </v-col>
        <v-col cols="6">
          <v-btn
            @click="closeModal"
            elevation="2"
            outlined
          >Cancelar</v-btn>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<script>
export default {
  props: {
    dayOfReminder: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      rules: [
        value => !!value || 'Required',
        value => (value && value.length <= 30) || 'Max 30 characters'
      ],
      color: '#FFF',
      title: '',
      description: '',
    };
  },
  methods: {
    saveReminder() {
      console.log(this.title, this.description, this.color);
      this.closeModal();
    },
    closeModal() {
      this.resetData();
      this.$emit('close-modal', false);
    },
    resetData() {
      this.title = '';
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
}
.alert-container__content {
  background-color: #D9EFC1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 2.25rem;
}
.col {
  padding: 5px 0;
}
.row--padding {
  padding-left: .5rem;
}
.row {
  width: 100%;
}
</style>
