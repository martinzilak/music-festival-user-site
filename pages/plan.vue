<template>
  <v-layout>
    <v-flex>
      <v-container fluid>
        <div id="map-wrap" style="height: 88vh">
          <no-ssr>
            <l-map
              :zoom=mapZoom
              :center="mapCenter"
              :bounds="mapBounds"
              :max-bounds="mapBounds"
            >
              <l-tile-layer
                :url="mapUrl"
                :name="$t('map')"
                layer-type="base"
              />

              <l-polygon
                :lat-lngs="polygon.latLngs"
                :color="polygon.color"
                :fill-opacity="0.05"
              />

              <l-control-layers
                position="topright"
                :collapsed="false"
              />

              <l-layer-group
                v-for="layer in layers"
                :key="layer.type"
                :visible="layer.visible"
                :name="layer.name"
                layer-type="overlay"
              >
                <l-marker
                  v-for="(marker, i) in layer.markers"
                  :key="`${layer.type}-m${i}`"
                  :lat-lng="[Number(marker.latitude), Number(marker.longitude)]"
                >
                  <l-icon>
                    <v-icon
                      :color="layer.color"
                    >
                      {{ layer.icon }}
                    </v-icon>
                  </l-icon>

                  <l-tooltip>
                    {{ tooltipText(marker) }}
                  </l-tooltip>
                </l-marker>
              </l-layer-group>
            </l-map>
          </no-ssr>
        </div>
      </v-container>
    </v-flex>
  </v-layout>
</template>

<script>
  import {getUrl, groupByParam, LOCATIONS} from "../plugins/settings";

  const MARKER_COLORS = {
    stage: 'black',
    food: 'red',
    drink: 'indigo',
    hygiene: 'brown',
    merch: 'blue-grey',
    info: 'light-blue',
    fallback: 'white',
  };
  const MARKER_ICONS = {
    stage: 'mdi-speaker',
    food: 'mdi-noodles',
    drink: 'mdi-cup-water',
    hygiene: 'mdi-toilet',
    merch: 'mdi-cart',
    info: 'mdi-information',
    fallback: 'mdi-map-marker',
  };
  const locTypesWithoutMarker = ['bound', 'border', 'center', 'other'];

  export default {
    name: 'plan',

    data () {
      return {
        mapZoom: 18,
        mapCenter: [40, 40],
        mapUrl: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
        mapBounds: [],
        polygon: {
          latLngs: [],
          color: 'green',
        },
        layers: [],
      };
    },

    methods: {
      tooltipText(marker) {
        return marker.detail?.name ?? marker.detail?.stage?.name ?? null;
      }
    },

    async created () {
      const locations = await this.$axios.$get(getUrl(LOCATIONS));
      const locationsByType = groupByParam(locations, 'type');

      this.layers = Object.keys(locationsByType)
        .filter(locType => !locTypesWithoutMarker.includes(locType))
        .map(locType => ({
          visible: true,
          color: MARKER_COLORS[locType] || MARKER_COLORS.fallback,
          icon: MARKER_ICONS[locType] || MARKER_ICONS.fallback,
          name: this.$i18n.t(locType),
          type: locType,
          markers: locationsByType[locType],
        }));

      this.polygon.latLngs = locationsByType.border
        .map(it => [Number(it.latitude), Number(it.longitude)]);

      this.mapBounds = locationsByType.bound
        .map(it => [Number(it.latitude), Number(it.longitude)])
        .slice(0, 2);

      const center = locationsByType.center[0];
      if (!!center) {
        this.mapCenter = [Number(center.latitude), Number(center.longitude)];
      }
    },
  }
</script>

<style scoped>

</style>