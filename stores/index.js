import { defineStore } from 'pinia';

export const useMainStore = defineStore('index', {
    state: () => ({
        openOnboarding: false
    }),
    getters: {
        // variableGetter: state => state.variable
    },
    actions: {
        // actionFunction() {
        //     this.variable
        // },
    },
});