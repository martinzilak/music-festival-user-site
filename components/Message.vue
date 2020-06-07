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

            formattedName() {
                return this.message.name.find(n => n.language.code === this.language).text;
            },

            formattedDatetime() {
                return this.$d(this.$moment(this.message.datetime).toDate(), 'datetime');
            },

            formattedDescription() {
                return this.message.description.find(d => d.language.code === this.language).text;
            },
        },
    }
</script>

<style scoped>

</style>