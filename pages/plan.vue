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
  import {LOCATIONS, PROD_URL} from "../plugins/settings";

  export default {
    name: 'plan',

    data () {
      return {
        mapZoom: 16,
        mapCenter: [40, 40],
        mapUrl: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
        polygon: {
          latLngs: [],
          color: 'green',
        },
      };
    },

    async created () {
      // const url = DEV_URL;
      const url = PROD_URL;
      const locations = await this.$axios.$get(`${url}${LOCATIONS}`);

      this.polygon.latLngs = locations
        .filter(it => it.type === 'border')
        .map(it => [Number(it.latitude), Number(it.longitude)]);

      const center = locations.find(it => it.type === 'center');
      this.mapCenter = [Number(center.latitude), Number(center.longitude)];
    },
  }
</script>

<style scoped>

</style>