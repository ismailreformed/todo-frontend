<template>
  <v-container>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="6" lg="4">
        <v-card tile>
          <v-card-title class="text-center">Login</v-card-title>
          <v-card-text>
            <v-form>
              <v-text-field v-model="email" label="Email" required readonly></v-text-field>
              <v-text-field v-model="password" label="Password" type="password" required readonly></v-text-field>
              <v-btn :loading="loading" type="submit" color="secondary" class="text--black" block @click="login">Login</v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import {setAuthToken, setAuthUser} from '../auth';
export default {
  data() {
    return {
      loading: false,
      email: 'ismailreformed@gmail.com',
      password: 'password'
    };
  },
  methods: {
    login() {
      this.loading = true;
      this.$http.post('/login', {
        email: this.email,
        password: this.password
      })
      .then((response) => {
        const user = JSON.stringify(response.data.data);
        setAuthUser(user);
        setAuthToken(response.data.token);
        this.$router.push('/')
      })
      .catch(error => {
        console.log(error, error.response.data.message)
      })
      .finally(() => {
        this.loading = false
      })
    }
  }
};
</script>

<style scoped>
/* Add your custom styles here */
</style>
