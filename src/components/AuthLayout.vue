<template>
  <div>
    <v-app-bar
      color="deep-purple"
    >
      <v-toolbar-title>My Todo App </v-toolbar-title>

      <v-spacer></v-spacer>

      <div>
        <v-select
          v-model="language"
          :items="languages"
          label="Language"
          outlined
          dense
          no-data-text="auto"
          hide-details
          @change="updateLocale"
        ></v-select>
      </div>
    </v-app-bar>

    <div class="container black">
      <todo-lists></todo-lists>
    </div>
  </div>
</template>

<script>
import TodoLists from './TodoLists.vue';
import {getAuthUser, getLocale, setLocale, removeLocale, removeAuthToken, removeAuthUser} from '../auth';

export default {
  name: "AuthLayout",

  components: {
    TodoLists
  },

  data() {
    return {
      languages: [
        {
          "text": "English",
          "value": 'en'
        },
        {
          "text": "Bangla",
          "value": 'bn'
        }
      ],

      language: "",
    }
  },

  created() {
    const local = getLocale()
    if(local) {
      this.language = local
    } else {
      this.language = 'en'
    }
  },

  methods: {
    logout() {
      removeAuthToken();
      removeAuthUser();
      removeLocale();
    },

    updateLocale() {
      const authUser = getAuthUser()
      const user = JSON.parse(authUser)

      this.$http.put(`/users/${user.id}`, {local: this.language})
      .then((response) => {
        setLocale(this.language)
      })
    }
  }
}
</script>

<style scoped>

</style>
