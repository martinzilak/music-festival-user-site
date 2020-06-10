<template>
    <v-layout>
        <v-flex>
            <v-container fluid>
                <v-row>
                    <v-col>
                        <v-row
                            justify="space-around"
                        >
                            <h3
                                v-if="!isLoggedIn"
                            >
                                {{ $t('loginTitle') }}
                            </h3>
                        </v-row>

                        <v-row
                            v-if="!isLoggedIn"
                            justify="space-around"
                        >
                            <v-col cols="auto" >
                                <v-text-field
                                    v-model="loginIdentifier"
                                    :label="$t('identifier')"
                                />

                                <v-text-field
                                    v-model="loginPassword"
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
                    </v-col>

                    <v-col
                        v-if="!isLoggedIn"
                    >
                        <v-row
                            justify="space-around"
                        >
                            <h3>
                                {{ $t('registerTitle') }}
                            </h3>
                        </v-row>

                        <v-row
                            justify="space-around"
                        >
                            <v-col cols="auto" >
                                <v-text-field
                                    v-model="registerIdentifier"
                                    :label="$t('identifier')"
                                />

                                <v-text-field
                                    v-model="email"
                                    :label="$t('email')"
                                />

                                <v-text-field
                                    v-model="registerPassword"
                                    type="password"
                                    :label="$t('password')"
                                />

                                <v-btn
                                    color="success"
                                    @click="register"
                                >
                                    {{ $t('register') }}
                                </v-btn>
                            </v-col>
                        </v-row>
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
                loginIdentifier: '',
                loginPassword: '',
                registerIdentifier: '',
                registerPassword: '',
                email: '',
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
                    identifier: this.loginIdentifier,
                    password: this.loginPassword,
                });
            },

            async register() {
                await this.$store.dispatch('register', {
                    username: this.registerIdentifier,
                    email: this.email,
                    password: this.registerPassword,
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