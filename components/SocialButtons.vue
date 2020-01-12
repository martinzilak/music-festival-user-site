<template>
  <v-card-actions>
    <template
      v-if="social"
    >
      <v-spacer />

      <v-btn
        v-if="social.website"
        title="Website"
        icon
        :href="social.website"
        target="_blank"
      >
        <v-icon>mdi-web</v-icon>
      </v-btn>

      <v-btn
        v-if="social.facebook"
        title="Facebook"
        icon
        :href="social.facebook"
        target="_blank"
      >
        <v-icon>mdi-facebook</v-icon>
      </v-btn>

      <v-btn
        v-if="social.instagram"
        title="Instagram"
        icon
        :href="social.instagram"
        target="_blank"
      >
        <v-icon>mdi-instagram</v-icon>
      </v-btn>

      <v-btn
        v-if="social.twitter"
        title="Twitter"
        icon
        :href="social.twitter"
        target="_blank"
      >
        <v-icon>mdi-twitter</v-icon>
      </v-btn>
    </template>
  </v-card-actions>
</template>

<script>
  export default {
    name: "SocialButtons",

    props: ['social'],
  }
</script>

<style scoped>

</style>