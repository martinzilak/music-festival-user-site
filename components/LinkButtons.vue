<template>
  <v-card-actions>
    <template
      v-if="link"
    >
      <v-spacer />

      <v-btn
        v-if="link.website"
        title="Website"
        icon
        :href="link.website"
        target="_blank"
      >
        <v-icon>mdi-web</v-icon>
      </v-btn>

      <v-btn
        v-if="link.facebook"
        title="Facebook"
        icon
        :href="link.facebook"
        target="_blank"
      >
        <v-icon>mdi-facebook</v-icon>
      </v-btn>

      <v-btn
        v-if="link.instagram"
        title="Instagram"
        icon
        :href="link.instagram"
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

    props: ['link'],
  }
</script>

<style scoped>

</style>