<template>
  <v-card-actions>
    <template
      v-if="links"
    >
      <v-spacer />

      <v-btn
        v-if="links.website"
        title="Website"
        icon
        :href="links.website"
        target="_blank"
      >
        <v-icon>mdi-web</v-icon>
      </v-btn>

      <v-btn
        v-if="links.facebook"
        title="Facebook"
        icon
        :href="links.facebook"
        target="_blank"
      >
        <v-icon>mdi-facebook</v-icon>
      </v-btn>

      <v-btn
        v-if="links.instagram"
        title="Instagram"
        icon
        :href="links.instagram"
        target="_blank"
      >
        <v-icon>mdi-instagram</v-icon>
      </v-btn>
    </template>
  </v-card-actions>
</template>

<script>
  export default {
    name: "LinkButtons",

    props: ['links'],
  }
</script>

<style scoped>

</style>