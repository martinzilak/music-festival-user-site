<template>
  <v-card
    class="mx-auto"
    max-width="400px"
  >
    <v-img
      :src="pic"
      height="200px"
    />

    <v-card-title
      v-text="artist.name"
      class="white--text align-end"
    />

    <link-buttons
      :social="artist.link"
      width="100%"
    />
  </v-card>
</template>

<script>
  import LinkButtons from "./LinkButtons";
  import {getPicture} from "../plugins/settings";

  export default {
    name: "Artist",

    components: {
      LinkButtons,
    },

    props: ['artist'],

    computed: {
      pic() {
        return getPicture(this.artist.pictures[0]);
      },
    },
  }
</script>

<style scoped>

</style>