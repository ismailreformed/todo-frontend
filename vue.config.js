// src/vuetify.js
import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: '#1976D2', // Customize your primary color
        secondary: '#424242', // Customize your secondary color
        accent: '#82B1FF', // Customize your accent color
      },
    },
  },
});
