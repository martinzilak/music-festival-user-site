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
      this.artists = await this.$axios.$get('https://music-festival-admin-panel.herokuapp.com/artists');
    },
  }
</script>

<style scoped>

</style>