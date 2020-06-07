<template>
    <v-layout>
        <v-flex>
            <v-container fluid>
                <v-row
                    v-if="!isLoggedIn"
                    justify="space-around"
                >
                    <v-col cols="auto" >
                        <v-text-field
                            v-model="identifier"
                            :label="$t('identifier')"
                        />

                        <v-text-field
                            v-model="password"
                            type="password"
                            :label="$t('password')"
                        />

                        <v-btn
                            color="success"
                            @click="login"
                        >
                            {{ $t('login') }}
                        </v-btn>
                    </v-col>
                </v-row>

                <v-row
                    v-else
                    justify="space-around"
                >
                    <v-col cols="auto" >
                        {{ $t('loggedInAs') }}<b>{{ getUsername }}</b>

                        <br />

                        <v-btn
                            color="success"
                            @click="logout"
                        >
                            {{ $t('logout') }}
                        </v-btn>
                    </v-col>
                </v-row>
            </v-container>
        </v-flex>
    </v-layout>
</template>

<script>
    export default {
        name: "login",

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
                await this.$store.dispatch('login', {
                    identifier: this.identifier,
                    password: this.password,
                });
            },

            logout() {
                this.$store.dispatch('logout');
            },
        },
    }
</script>

<style scoped>

</style>