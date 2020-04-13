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

    <v-card-text>
      <div>
        {{description}}
      </div>
    </v-card-text>

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

      description() {
        const language = this.$store.getters.getLanguage;
        return this.artist.descriptions.filter(desc => desc.language === language)[0].text;
      }
    },
  }
</script>

<style scoped>

</style>