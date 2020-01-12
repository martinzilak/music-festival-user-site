<template>
  <v-card
    class="mx-auto"
    max-width="400px"
  >
    <v-img
      :src="artist.picture[0].url"
      height="200px"
    />

    <v-card-title
      v-text="artist.name"
      class="white--text align-end"
    />

    <social-buttons
      :social="artist.social"
      width="100%"
    />
  </v-card>
</template>

<script>
  import SocialButtons from "./SocialButtons";

  export default {
    name: "Artist",

    components: {
      SocialButtons,
    },

    props: ['artist'],
  }
</script>

<style scoped>

</style>