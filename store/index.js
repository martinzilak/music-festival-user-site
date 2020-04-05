import Vuex from 'vuex';

const createStore = () => {
    return new Vuex.Store({
        state: () => ({
            jwt: '',
            user: {},
        }),

        mutations: {
            setJwtToken(state, jwt) {
                state.jwt = jwt;
            },
            setUser(state, user) {
                state.user = user;
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
            }
        },
    });
};

export default createStore;