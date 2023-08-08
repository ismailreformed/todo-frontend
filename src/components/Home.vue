<template>
      <div>
        <v-app-bar
          color="deep-purple"
          dense
        >
          <v-toolbar-title>My Todo App </v-toolbar-title>

          <v-spacer></v-spacer>

          <v-btn icon>
            <v-icon color="primary">mdi-heart</v-icon>
          </v-btn>

          <v-menu
            left
            bottom
          >
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                icon
                v-bind="attrs"
                v-on="on"
                color="black"
              >
                <v-icon>mdi-dots-vertical</v-icon>
              </v-btn>
            </template>

            <v-list>
              <v-list-item
                v-for="n in 5"
                :key="n"
                @click="() => {}"
              >
                <v-list-item-title>Option {{ n }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-app-bar>

        <div class="container black">
          <todo-lists></todo-lists>
        </div>
      </div>
</template>

<script>
import TodoLists from './TodoLists.vue';

export default {
  name: 'Home',
  components: {
   TodoLists
  },

  data () {
    return {
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
