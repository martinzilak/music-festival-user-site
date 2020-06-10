import Vuex from 'vuex';
import {
    getUrl,
    LOGIN,
    ME,
    PERFORMANCES,
    REGISTER,
    COOKIE_NAME,
    COOKIE_OPTIONS, ME_DEEP,
} from "../plugins/settings";

const login = (commit, res) => {
    commit('setJwtToken', res.jwt);
    commit('setUser', res.user);
    commit('setLanguage', res.user.language.code ?? 'en');
    commit('setFavorites', res.user.performances ?? []);
};

const logout = (commit) => {
    commit('setJwtToken', '');
    commit('setUser', {});
    commit('setFavorites', []);
};

const authHeader = (jwt) => ({
    'Authorization': `Bearer ${jwt}`,
});

const createStore = () => {
    return new Vuex.Store({
        state: () => ({
            drawer: true,
            jwt: '',
            user: {},
            language: 'en',
            favorites: [],
        }),

        mutations: {
            setDrawer(state, drawer) {
                state.drawer = drawer;
            },
            setJwtToken(state, jwt) {
                state.jwt = jwt;
            },
            setUser(state, user) {
                state.user = user;
            },
            setLanguage(state, language) {
                state.language = language;
            },
            setFavorites(state, favorites) {
                state.favorites = favorites;
            },
        },

        actions: {
            setDrawer({ commit }, drawer) {
                commit('setDrawer', drawer);
            },

            async checkLoginStatus({ commit }) {
                const cookie = this.$cookies.get(COOKIE_NAME);
                if (cookie !== '') {
                    const response = this.$axios.$get(getUrl(ME), {
                        headers: authHeader(cookie),
                    });

                    response
                        .then(res => {
                            const userDeep = this.$axios.$get(getUrl(ME_DEEP), {
                                headers: authHeader(cookie),
                            });
                            userDeep.then(resDeep => {
                                login(commit, { jwt: cookie, user: resDeep });
                                this.$i18n.setLocale(res.language.code);
                            });
                        })
                        .catch(_ => {
                            logout(commit);
                            this.$cookies.remove(COOKIE_NAME);
                        });
                } else {
                    logout(commit);
                    this.$cookies.remove(COOKIE_NAME);
                }
            },

            async login({ commit }, data) {
                const response = this.$axios.$post(getUrl(LOGIN), data);

                response
                    .then(res => {
                        login(commit, res);
                        this.$cookies.set(COOKIE_NAME, res.jwt, COOKIE_OPTIONS);
                        this.$i18n.setLocale(res.user.language.code);
                    })
                    .catch(_ => {
                        logout(commit);
                        this.$cookies.remove(COOKIE_NAME);
                    });
            },

            async register({ commit }, data) {
                const response = this.$axios.$post(getUrl(REGISTER), {
                    ...data,
                    language: {
                        code: this.$i18n.locale,
                    },
                    performances: [],
                });

                response
                    .then(res => {
                        login(commit, res);
                        this.$cookies.set(COOKIE_NAME, res.jwt, COOKIE_OPTIONS);
                        this.$i18n.setLocale(res.user.language.code);
                    })
                    .catch(_ => {
                        logout(commit);
                        this.$cookies.remove(COOKIE_NAME);
                    });
            },

            logout({ commit }) {
                logout(commit);
                this.$cookies.remove(COOKIE_NAME);
            },

            async changeLanguage({ commit, state }, language) {
                if (state.jwt !== '') {
                    await this.$axios({
                        method: 'PUT',
                        url: getUrl(ME),
                        headers: authHeader(state.jwt),
                        data: {
                            language: {
                                code: language,
                            },
                        }
                    });
                }
                commit('setLanguage', language);
                this.$i18n.setLocale(language);
            },

            async addFavorite({ commit, state }, performance) {
                const newFavorite = await this.$axios.$get(getUrl(PERFORMANCES, performance.id));

                const newFavorites = [
                    ...state.favorites,
                    newFavorite,
                ];

                await this.$axios({
                    method: 'PUT',
                    url: getUrl(ME),
                    headers: authHeader(state.jwt),
                    data: {
                        performances: newFavorites,
                    }
                });

                commit('setFavorites', newFavorites);
            },

            async removeFavorite({ commit, state }, performance) {
                const newFavorites = state.favorites.filter(p => p.id !== performance.id);

                await this.$axios({
                    method: 'PUT',
                    url: getUrl(ME),
                    headers: authHeader(state.jwt),
                    data: {
                        performances: newFavorites,
                    }
                });

                commit('setFavorites', newFavorites);
            },
        },

        getters: {
            getDrawer(state) {
                return state.drawer;
            },
            isUserLoggedIn(state) {
                return state.jwt !== '';
            },
            getUsername(state) {
                return state.user.username;
            },
            getLanguage(state) {
                return state.language;
            },
            isFavorite: (state) => (performance) => {
                return !!state.favorites?.find(p => p.id === performance?.id);
            },
        },
    });
};

export default createStore;