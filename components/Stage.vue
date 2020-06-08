<template>
    <v-card
        class="mx-auto"
        max-width="400px"
    >
        <v-img
            :src="pic"
            height="200px"
        />

        <v-card-title
            v-text="stage.name"
            class="white--text align-end"
        />

        <v-card-text>
            <div>
                {{ description }}
            </div>
        </v-card-text>
    </v-card>
</template>

<script>
    import {getPicture} from "../plugins/settings";

    export default {
        name: "Stage",

        props: ['stage'],

        computed: {
            pic() {
                return getPicture(this.stage.pictures[0]);
            },

            description() {
                const language = this.$store.getters.getLanguage;
                return this.stage.description.filter(desc => desc.language.code === language)[0].text;
            }
        },
    }
</script>

<style scoped>

</style>