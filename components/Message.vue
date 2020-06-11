<template>
    <v-card
        style="margin-top: 20px;"
    >
        <v-card-title class="headline">
            {{ formattedName }}
        </v-card-title>

        <v-card-subtitle>
            <v-icon>
                mdi-calendar-clock
            </v-icon>

            {{ formattedDatetime }}
        </v-card-subtitle>

        <v-card-text>
            {{ formattedDescription }}
        </v-card-text>
    </v-card>
</template>

<script>
    export default {
        name: "Messages",

        props: ['message'],

        computed: {
            language() {
                return this.$store.getters.getLanguage;
            },

            detail() {
                return this.message.detail.find(d => d.language.code === this.language);
            },

            formattedName() {
                return this.detail?.name;
            },

            formattedDatetime() {
                return this.$d(this.$moment(this.message.datetime).toDate(), 'datetime');
            },

            formattedDescription() {
                return this.detail?.text;
            },
        },
    }
</script>

<style scoped>

</style>