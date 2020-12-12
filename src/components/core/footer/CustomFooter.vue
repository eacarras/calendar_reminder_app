<template>
  <v-footer
    dark
    padless
  >
    <v-card
      flat
      tile
      width="100%"
      class="indigo lighten-1 white--text text-center"
    >
      <v-card-text class="pa-0 ma-0">
        <v-btn
          v-for="icon in icons"
          :key="icon"
          class="white--text"
          icon
        >
          <v-icon size="24px">
            {{ icon }}
          </v-icon>
        </v-btn>
      </v-card-text>

      <v-card-text class="white--text">
        All rights reserved. eacarras {{ new Date().getFullYear() }}
      </v-card-text>
    </v-card>
  </v-footer>
</template>

<script>
  export default {
    // TODO: ADD REDIRECT TO LINK
    data() {
      return {
        icons: [
          'mdi-github',
          'mdi-linkedin',
          'mdi-instagram',
        ],
      };
    },
  }
</script>

<style scoped>
.v-card__text {
  padding: 5px;
}
</style>