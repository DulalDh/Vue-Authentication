import Vue from 'vue';
import { authClient } from "../../api";
const user = JSON.parse(localStorage.getItem('currentUser'));
const initialState = user ? { token: localStorage.getItem('token'), status: { loggedIn: true }, user } : { token: '', status: { loggedIn: false }, user: null };

export const authentication = {
    namespaced: true,
    state: initialState,
    getters: {
        isAuthenticated: (state) => {
            if (!state.token || state.token.length == 0 && localStorage.getItem('token') != null) {
                Vue.set(state, 'token', localStorage.getItem('token'));
            }
            return (state.token && state.token.length > 0);
        }
    },
    actions: {
        login({ commit }, payload) {
            commit('loginRequest', payload);
            return new Promise((resolve, reject) => {

                authClient.login(payload).then(response => {
                    if (response.status === 200) {
                        localStorage.setItem("currentUser", JSON.stringify(payload));
                        localStorage.setItem("token", JSON.stringify(response.body.token));
                        commit('loginSuccess', response);
                        resolve(response);
                    } else {
                        commit('loginFailure', response);
                        reject(response);
                    }
                });
            });

        },
        logout({ commit }) {
            localStorage.removeItem("token");
            localStorage.removeItem("currentUser");
            commit('logout');
        }
    },
    mutations: {
        loginRequest(state, user) {
            state.status = { loggingIn: true };
            state.user = user;
        },
        loginSuccess(state, user) {
            console.log("loginSuccess");
            if (!state.token || state.token.length == 0) {
                Vue.set(state, 'token', localStorage.getItem('token'));

            }
            state.status = { loggedIn: true };
            state.user = user;
        },
        loginFailure(state) {
            state.status = {};
            state.user = null;
        },
        logout(state) {
            state.status = { loggedIn: false };
            state.user = null;
            state.token = '';
        }
    }
}