<template>
  <v-container class="alert-container">
    <v-card>
      <v-card-title class="headline grey lighten-2">
          The following topics are the title of the not showed reminders
        </v-card-title>
        <v-divider></v-divider>
        
        <v-card-text>
          {{ dataDialog }}
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            text
            @click="closeModal"
          >
            Got cha
          </v-btn>
        </v-card-actions>
      </v-card>
  </v-container>
</template>

<script>
export default {
  props: {
    dataDialog: {
      type: String,
      required: true,
    },
  },
  methods: {
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
