<template>
    <v-layout>
        <v-flex>
            <v-container fluid>
                <v-row>
                    <h3>
                        {{ $t('infoTitle') }}
                    </h3>
                </v-row>

                <v-row>
                    <div>
                        <p>
                            {{ formattedDescription }}
                        </p>
                    </div>
                </v-row>

                <hr />
                <br />

                <v-row>
                    <v-expansion-panels>
                        <InfoItem
                            v-for="(item, i) in filteredItems"
                            :key="`info-item-${i}`"
                            :item="item"
                        />
                    </v-expansion-panels>
                </v-row>
            </v-container>
        </v-flex>
    </v-layout>
</template>

<script>
    import InfoItem from "../components/InfoItem";
    import {getUrl, INFO} from "../plugins/settings";

    export default {
        name: "info",

        data() {
            return {
                items: [],
                description: [],
            }
        },

        components: {
            InfoItem
        },

        async created() {
            const info = await this.$axios.$get(getUrl(INFO));
            this.items = info?.item;
            this.description = info?.description;
        },

        computed: {
            language() {
                return this.$store.getters.getLanguage;
            },

            filteredItems() {
                return this.items
                    .filter(i => i.language.code === this.language)
                    ?.sort((a, b) => a.name?.localeCompare(b.name ?? 'Z', [this.language()]));
            },

            formattedDescription() {
                return this.description.find(d => d.language.code === this.language)?.text;
            }
        },
    }
</script>

<style scoped>

</style>