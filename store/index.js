import Vuex from 'vuex';
import {getUrl, LOGIN, USERS, PERFORMANCES} from "../plugins/settings";

const createStore = () => {
    return new Vuex.Store({
        state: () => ({
            jwt: '',
            user: {},
            language: 'en',
            favorites: [],
        }),

        mutations: {
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
            async login({ commit }, data) {
                const response = this.$axios.$post(getUrl(LOGIN), data);

                response
                    .then(res => {
                        commit('setJwtToken', res.jwt);
                        commit('setUser', res.user);
                        commit('setLanguage', res.user.language.code);
                        this.$i18n.setLocale(res.user.language.code);
                        commit('setFavorites', res.user.performances);
                    })
                    .catch(_ => {
                        commit('setJwtToken', '');
                        commit('setUser', {});
                        commit('setFavorites', []);
                    });
            },

            logout({ commit }) {
                commit('setJwtToken', '');
                commit('setUser', {});
                commit('setFavorites', []);
            },

            changeLanguage({commit}, language) {
                commit('setLanguage', language);
                this.$i18n.setLocale(language);
            },

            async addFavorite({ commit, state }, performance) {
                const newFavorite = await this.$axios.$get(getUrl(PERFORMANCES, performance.id));

                const newFavorites = [
                    ...state.favorites,
                    newFavorite,
                ];

                // await this.$axios.$put(getUrl(USERS, state.user.id), {
                //     data: {
                //         performances: newFavorites,
                //     },
                //     headers: {
                //         'Authorization': `Bearer ${state.jwt}`,
                //     }
                // });

                commit('setFavorites', newFavorites);
            },

            async removeFavorite({ commit, state }, performance) {
                const newFavorites = state.favorites.filter(p => p.id !== performance.id);

                // await this.$axios.$put(`${getUrl(USERS)}/${state.user.id}`, {
                //     data: {
                //         performances: newFavorites,
                //     },
                //     headers: {
                //         'Authorization': `Bearer ${state.jwt}`,
                //     }
                // });

                commit('setFavorites', newFavorites);
            },
        },

        getters: {
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
                return !!state.favorites.find(p => p.id === performance?.id);
            },
        },
    });
};

export default createStore;