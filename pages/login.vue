<template>
    <v-layout>
        <v-flex>
            <v-container fluid>
                <v-row
                    v-if="alert"
                    justify="space-around"
                >
                    <v-alert
                        v-model="alert"
                        type="error"
                        dense
                        dismissible
                    >
                        There was an error while trying to log in.
                    </v-alert>
                </v-row>

                <v-row
                    v-if="!isLoggedIn"
                    justify="space-around"
                >
                    <v-col cols="auto" >
                        <v-text-field
                            v-model="identifier"
                            label="Identifier"
                        />

                        <v-text-field
                            v-model="password"
                            type="password"
                            label="Password"
                        />

                        <v-btn
                            color="success"
                            @click="login"
                        >
                            Log in
                        </v-btn>
                    </v-col>
                </v-row>

                <v-row
                    v-else
                    justify="space-around"
                >
                    <v-col cols="auto" >
                        {{ `Logged in as ${getUsername}` }}

                        <br />

                        <v-btn
                            color="success"
                            @click="logout"
                        >
                            Log out
                        </v-btn>
                    </v-col>
                </v-row>
            </v-container>
        </v-flex>
    </v-layout>
</template>

<script>
    import {LOGIN, getUrl} from "../plugins/settings";

    export default {

        data() {
            return {
                identifier: '',
                password: '',
                alert: false,
            }
        },

        computed: {
            isLoggedIn() {
                return this.$store.getters.isUserLoggedIn;
            },
            getUsername() {
                return this.$store.getters.getUsername;
            },
        },

        methods: {
            async login() {
                const url = DEV_URL;
                // const url = PROD_URL;

                const response = this.$axios.$post(getUrl(LOGIN), {
                    identifier: this.identifier,
                    password: this.password,
                });

                response
                    .then(res => this.$store.dispatch('login', res))
                    .catch(_ => {
                        this.alert = true;
                        this.identifier = '';
                        this.password = '';
                    });
            },

            logout() {
                this.$store.dispatch('logout');
            }
        },
    }
</script>

<style scoped>

</style>