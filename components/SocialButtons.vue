<template>
    <div
        v-if="social"
    >
        <v-spacer />

        <v-btn
            v-if="social.facebook"
            title="Facebook"
            icon
            :href="social.facebook"
            target="_blank"
            small
        >
            <v-icon>mdi-facebook</v-icon>
        </v-btn>

        <v-btn
            v-if="social.instagram"
            title="Instagram"
            icon
            :href="social.instagram"
            target="_blank"
            small
        >
            <v-icon>mdi-instagram</v-icon>
        </v-btn>

        <v-btn
            v-if="social.twitter"
            title="twitter"
            icon
            :href="social.twitter"
            target="_blank"
            small
        >
            <v-icon>mdi-twitter</v-icon>
        </v-btn>

        <v-btn
            v-if="social.spotify"
            title="spotify"
            icon
            :href="social.spotify"
            target="_blank"
            small
        >
            <v-icon>mdi-spotify</v-icon>
        </v-btn>
    </div>
</template>

<script>
    export default {
        name: "SocialButtons",

        props: ['social'],
    }
</script>

<style scoped>

</style>