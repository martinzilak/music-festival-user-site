<template>
  <v-layout>
    <v-flex>
      <v-container fluid>
        <v-row
          justify="space-around"
        >
          <v-col
            v-for="performance in performances"
            :key="performance.id"
            cols="auto"
          >
            <performance
              :performance="performance"
            />
          </v-col>
        </v-row>
      </v-container>
    </v-flex>
  </v-layout>
</template>

<script>
  import Performance from "../components/Performance";
  import {getUrl, PERFORMANCES} from "../plugins/settings";

  export default {
    name: "performances",

    components: {
      Performance,
    },

    data() {
      return {
        performances: [],
      }
    },

    async created() {
      this.performances = await this.$axios.$get(getUrl(PERFORMANCES));
    },
  }
</script>

<style scoped>

</style>