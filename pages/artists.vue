<template>
  <v-layout>
    <v-flex>
      <v-container fluid>
        <v-row
          justify="space-around"
        >
          <v-col
            v-for="artist in artists"
            :key="artist.id"
            cols="auto"
          >
            <artist
              :artist="artist"
            />
          </v-col>
        </v-row>
      </v-container>
    </v-flex>
  </v-layout>
</template>

<script>
  import Artist from "../components/Artist";
  import {ARTISTS, DEV_URL, PROD_URL} from "../plugins/settings";

  export default {
    name: "artists",

    components: {
      Artist,
    },

    data() {
      return {
        artists: [],
      }
    },

    async created() {
      // const url = DEV_URL;
      const url = PROD_URL;
      this.artists = await this.$axios.$get(`${url}${ARTISTS}`);
    },
  }
</script>

<style scoped>

</style>