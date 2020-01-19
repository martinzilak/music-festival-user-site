<template>
  <v-layout>
    <v-flex>
      <v-container fluid>
        <div id="map-wrap" style="height: 88vh">
          <no-ssr>
            <l-map
              :zoom=mapZoom
              :center="mapCenter"
            >
              <l-tile-layer
                :url="mapUrl"
              />

              <l-marker
                :lat-lng="mapCenter"
              />

              <l-polygon
                :lat-lngs="polygon.latLngs"
                :color="polygon.color"
              />
            </l-map>
          </no-ssr>
        </div>
      </v-container>
    </v-flex>
  </v-layout>
</template>

<script>
  export default {
    name: 'plan',

    data () {
      return {
        mapZoom: 13,
        mapCenter: [49.187618, 16.582569],
        mapUrl: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
        polygon: {
          latLngs: [
            [49.189245, 16.587092],
            [49.190310, 16.578895],
            [49.193452, 16.570355],
            [49.189469, 16.569926],
            [49.184560, 16.581470],
            [49.187702, 16.587092],
          ],
          color: 'green',
        },
      };
    },
  }
</script>

<style scoped>

</style>