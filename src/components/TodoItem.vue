<template>
  <v-list-item>
    <v-list-item-content>
      {{ todo.id }}
    </v-list-item-content>
    <v-list-item-content>
      {{ todo.text }}
    </v-list-item-content>
    <v-list-item-action>
      <v-btn rounded @click="removeTodo">Delete</v-btn>
    </v-list-item-action>
  </v-list-item>
</template>

<script>
export default {
  props: {
    todo: {
      type: Object,
      required: true
    }
  },

  methods: {
    removeTodo() {
      this.$emit('remove', this.todo.id);
    },
  },
};
</script>
