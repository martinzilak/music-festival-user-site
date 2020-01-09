<template>
  <v-layout>
    <v-flex class="text-center">
      <ul>
        <li
          v-for="performance in performances"
        >
          {{ performance.artist.name }} on {{ performance.stage.name }} at {{ performance.datetime }} o'clock
        </li>
      </ul>
    </v-flex>
  </v-layout>
</template>

<script>
  export default {
    name: "performances",

    data() {
      return {
        performances: [],
      }
    },

    async created() {
      this.performances = await this.$axios.$get('https://music-festival-admin-panel.herokuapp.com/performances');
    },
  }
</script>

<style scoped>

</style>