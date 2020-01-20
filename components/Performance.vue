<template>
  <v-card
    class="mx-auto"
    max-width="400px"
  >
    <v-carousel
      :cycle="false"
      hide-delimiters
      show-arrows-on-hover
      height="200px"
    >
      <v-carousel-item
        v-for="(picture, i) in [performance.artist.picture[0], performance.stage.pictures[0]]"
        :key="i"
      >
        <v-img
          :src="picture.url"
          height="100%"
        />
      </v-carousel-item>
    </v-carousel>

    <v-card-title
      v-text="performance.artist.name"
      class="white--text align-end"
    />

    <v-card-text>
      <v-icon>
        mdi-crosshairs-gps
      </v-icon>

      {{ performance.stage.name }}

      <br>

      <v-icon>
        mdi-calendar-clock
      </v-icon>

      {{ performance.datetime }}
    </v-card-text>
  </v-card>
</template>

<script>
  export default {
    name: "Performance",

    props: ['performance'],
  }
</script>

<style scoped>

</style>