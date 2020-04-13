import Vuex from 'vuex';

const createStore = () => {
    return new Vuex.Store({
        state: () => ({
            jwt: '',
            user: {},
            language: 'en',
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
        },

        actions: {
            login({commit}, response) {
                commit('setJwtToken', response.jwt);
                commit('setUser', response.user);
            },

            logout({commit}) {
                commit('setJwtToken', '');
                commit('setUser', {});
            },

            changeLanguage({commit}, language) {
                commit('setLanguage', language);
            },
        },

        getters: {
            isUserLoggedIn(state) {
                return state.jwt !== '';
            },
            getAuthorizedHeader(state) {
                return {Authorization: `Bearer ${state.jwt}`};
            },
            getUsername(state) {
                return state.user.username;
            },
            getLanguage(state) {
                return state.language;
            },
        },
    });
};

export default createStore;