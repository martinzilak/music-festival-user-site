<template>
    <v-layout>
        <v-flex>
            <v-container fluid>
                <v-row
                    justify="space-around"
                >
                    <v-col
                        v-for="stage in stages"
                        :key="stage.id"
                        cols="auto"
                    >
                        <stage
                            :stage="stage"
                        />
                    </v-col>
                </v-row>
            </v-container>
        </v-flex>
    </v-layout>
</template>

<script>
    import Stage from "../components/Stage";
    import {STAGES, getUrl} from "../plugins/settings";

    export default {
        name: "stages",

        components: {
            Stage,
        },

        data() {
            return {
                stages: [],
            }
        },

        async created() {
            this.stages = await this.$axios.$get(getUrl(STAGES));
        },
    }
</script>

<style scoped>

</style>